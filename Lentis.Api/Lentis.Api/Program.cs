using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using Resend;
using Lentis.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// 1. Core services
builder.Services.AddControllers();

// --- NEW DATA SERVICE SECTION ---------------------------------------------------------- //

// Retrieve the database connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Validate that the connection string is not empty
if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("DefaultConnection is missing.");
}

// Register the database context with the DI container using PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});


// --------------------------------

// 2. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. Rate limiting
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("contactPolicy", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 2;
    });

    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsync(
            "Too many requests. Please try again later.",
            token
        );
    };
});

// 4. External services (Resend)
builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();

var resendApiToken = builder.Configuration["RESEND_APITOKEN"];

if (string.IsNullOrWhiteSpace(resendApiToken))
{
    throw new InvalidOperationException("RESEND_APITOKEN is missing.");
}

builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = resendApiToken;
});

builder.Services.AddTransient<IResend, ResendClient>();

// 4. Dev tools
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Below "app.Use..." is the middleware section:

app.UseHttpsRedirection();

// CORS MUST come before MapControllers
app.UseCors("Frontend");

// app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers();

app.Run();
