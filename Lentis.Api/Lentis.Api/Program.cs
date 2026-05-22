using Lentis.Api.Data;
using Lentis.Api.Middleware;
using Lentis.Api.Responses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Resend;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);


// Configure logging providers
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// --- START OF RENDER DEBUGGING --- //
Console.WriteLine("=== STARTUP DEBUG ===");

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

Console.WriteLine($"JWT Key Exists: {!string.IsNullOrEmpty(builder.Configuration["Jwt:Key"])}");

Console.WriteLine($"Admin Email Exists: {!string.IsNullOrEmpty(builder.Configuration["AdminCredentials:Email"])}");

Console.WriteLine($"Admin Hash Exists: {!string.IsNullOrEmpty(builder.Configuration["AdminCredentials:PasswordHash"])}");

Console.WriteLine($"Connection String Exists: {!string.IsNullOrEmpty(builder.Configuration.GetConnectionString("DefaultConnection"))}");

Console.WriteLine($"Allowed Origin Exists: {!string.IsNullOrEmpty(builder.Configuration["AllowedOrigins:Frontend"])}");
Console.WriteLine($"JWT Issuer Exists: {!string.IsNullOrEmpty(builder.Configuration["Jwt:Issuer"])}");
Console.WriteLine($"JWT Audience Exists: {!string.IsNullOrEmpty(builder.Configuration["Jwt:Audience"])}");

Console.WriteLine("=== END STARTUP DEBUG ===");
// --- END OF RENDER DEBUGGING --- //


// --- ENVIRONMENT LOGGING ---
Console.WriteLine($"ENVIRONMENT: {builder.Environment.EnvironmentName}");

// --- SECURE CONFIG VALIDATION ---

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

var adminEmail = builder.Configuration["AdminCredentials:Email"];

var adminPasswordHash =
    builder.Configuration["AdminCredentials:PasswordHash"];

var resendApiToken = builder.Configuration["Resend:ApiToken"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException("Jwt:Key is not configured.");
}

if (string.IsNullOrWhiteSpace(jwtIssuer))
{
    throw new InvalidOperationException("Jwt:Issuer is not configured.");
}

if (string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException("Jwt:Audience is not configured.");
}

if (string.IsNullOrWhiteSpace(adminEmail))
{
    throw new InvalidOperationException("Admin email is not configured.");
}

if (string.IsNullOrWhiteSpace(adminPasswordHash))
{
    throw new InvalidOperationException("Admin password hash is not configured.");
}

if (string.IsNullOrWhiteSpace(resendApiToken))
{
    throw new InvalidOperationException("Resend API token is not configured.");
}

// --- 1. CORE SERVICES ---
builder.Services.AddControllers();

// --- CUSTOM VALIDATION RESPONSE NORMALIZATION ---
// [ApiController] automatically validates DTOs before controller actions run.
// By default, ASP.NET Core returns a large built-in validation payload.
//
// We override that default behavior here so the API always returns
// our standardized ApiResponse<T> structure.
//
// This keeps frontend handling consistent across:
// - validation errors
// - authentication errors
// - normal success responses
// - server failures
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        // Extract validation errors from ModelState
        var errors = context.ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors
                    .Select(e => e.ErrorMessage)
                    .ToArray()
            );

        // Create standardized API response
        var response = new ApiResponse<object>
        {
            Success = false,
            Message = "Validation failed.",
            Errors = errors
        };

        return new BadRequestObjectResult(response);
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- 2. DATABASE CONFIGURATION ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// --- 3. CORS CONFIGURATION -- Environment Based -- (Critical for Cookies) --

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Required for HttpOnly cookies
    });
});

// --- 4. RATE LIMITING ---
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("LeadSubmitPolicy", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    options.AddFixedWindowLimiter("AdminLoginPolicy", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";

        await context.HttpContext.Response.WriteAsJsonAsync(new
        {
            message = "Too many requests. Please try again later.",
            statusCode = 429
        }, token);
    };
});

// --- 5. EXTERNAL SERVICES (Resend) ---
builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();

builder.Services.Configure<ResendClientOptions>(options => 
{ 
    options.ApiToken = resendApiToken; 
});

builder.Services.AddTransient<IResend, ResendClient>();
builder.Services.AddHealthChecks();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1)
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // Pull token from the cookie we set in AuthController
                var token = context.Request.Cookies["lentis_admin"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

// Configure app to accept forwarded headers from reverse proxies (like Nginx, Apache, or AWS ALB)
// Clears KnownNetworks and KnownProxies to trust all upstream proxies (required if proxy IPs change)
builder.Services.Configure<ForwardedHeadersOptions>(options => {
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

// Builds the configured application instance
var app = builder.Build();

// Enable the forwarded headers middleware to process headers configured above
// This must run before authentication, authorization, or routing middlewares
app.UseForwardedHeaders();

// Logs the API startup message and current environment
app.Logger.LogInformation(
    "Lentis API starting in {Environment} mode",
    app.Environment.EnvironmentName);


// --- 7. MIDDLEWARE PIPELINE (The Order Matters!) ---

// A. Global Error Handling
app.UseMiddleware<ExceptionMiddleware>();

// B. Security Headers (ADD IT HERE)
app.UseMiddleware<SecurityHeadersMiddleware>();

// C. Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// D. HSTS should only run outside development.
//    It tells browsers to use HTTPS only for future requests.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// E. Protocol and Routing
app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    // Prevent browsers from guessing/sniffing MIME types; forces compliance with declared Content-Type header.
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";

    // Legacy clickjacking defense; prevents this site from being rendered inside an iframe on other domains.
    context.Response.Headers["X-Frame-Options"] = "DENY";

    // Highest privacy setting; strips the 'Referer' header completely so no URL data leaks to external sites.
    context.Response.Headers["Referrer-Policy"] = "no-referrer";

    // Disables browser hardware features (GPS, mic, camera) globally to protect user privacy.
    context.Response.Headers["Permissions-Policy"] =
        "geolocation=(), microphone=(), camera=()";

    // Restricts where resources (scripts, styles, images) can be loaded from to prevent XSS.
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; " + // Fallback rule: only trust resources from this exact origin.
        "script-src 'self'; " +  // Only allow JavaScript execution from files hosted on this domain.
        "style-src 'self' 'unsafe-inline'; " + // WARNING: 'unsafe-inline' allows inline styles, increasing CSS injection risks.
        "img-src 'self' data: https:; " + // WARNING: 'https:' allows images from any secure site; too broad.
        "connect-src 'self' https://admin.lentisgroup.com https://api.lentisgroup.com; " + // Whitelists AJAX/Fetch API destinations.
        "frame-ancestors 'none';"; // Modern clickjacking defense; supersedes X-Frame-Options by blocking all iframe embedding.

    // Pass execution to the next middleware component in the ASP.NET Core pipeline.
    await next();
});

app.UseRouting();

// D. CORS
app.UseCors("Frontend");

// E. Security & Identity
app.UseAuthentication();
app.UseAuthorization();

// F. Rate Limiting
app.UseRateLimiter();

// G. Execution
app.MapControllers();

app.MapHealthChecks("/health");

app.Run();