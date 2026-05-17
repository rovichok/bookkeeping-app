using Lentis.Api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Resend;
using System.Text;
using System.Threading.RateLimiting;
using Lentis.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine($"ENVIRONMENT: {builder.Environment.EnvironmentName}");

// --- 1. CORE SERVICES ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- 2. DATABASE CONFIGURATION ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// --- 3. CORS CONFIGURATION -- Environment Based -- (Critical for Cookies) ---
// --- 3. CORS CONFIGURATION (Environment-Based) ---

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
var resendApiToken = builder.Configuration["RESEND_APITOKEN"]
    ?? throw new InvalidOperationException("RESEND_APITOKEN is missing.");

builder.Services.Configure<ResendClientOptions>(options => { options.ApiToken = resendApiToken; });
builder.Services.AddTransient<IResend, ResendClient>();
builder.Services.AddHealthChecks();

// --- 6. AUTHENTICATION & JWT (Configured to read from Cookie) ---
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing.");
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer is missing.");
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? throw new InvalidOperationException("Jwt:Audience is missing.");

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

// B. Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// C. Protocol and Routing
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