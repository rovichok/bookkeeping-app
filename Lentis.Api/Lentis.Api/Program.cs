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

var builder = WebApplication.CreateBuilder(args);

// --- START OF RENDER DEBUGGING --- //
Console.WriteLine("=== STARTUP DEBUG ===");

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

Console.WriteLine($"JWT Key Exists: {!string.IsNullOrEmpty(builder.Configuration["Jwt:Key"])}");

Console.WriteLine($"Admin Email Exists: {!string.IsNullOrEmpty(builder.Configuration["AdminCredentials:Email"])}");

Console.WriteLine($"Admin Hash Exists: {!string.IsNullOrEmpty(builder.Configuration["AdminCredentials:PasswordHash"])}");

Console.WriteLine($"Connection String Exists: {!string.IsNullOrEmpty(builder.Configuration.GetConnectionString("DefaultConnection"))}");

Console.WriteLine($"Allowed Origin Exists: {!string.IsNullOrEmpty(builder.Configuration["AllowedOrigins:Frontend"])}");

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

var app = builder.Build();

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