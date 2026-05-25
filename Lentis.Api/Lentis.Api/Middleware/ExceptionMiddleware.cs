using Lentis.Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Lentis.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // 1. Log the failure immediately with context variables
            _logger.LogError(
                ex,
                "Unhandled exception for {Method} {Path}",
                context.Request.Method,
                context.Request.Path
            );

            // 2. Resolve tracking ID using your custom middleware, Activity API, or internal server trace
            var correlationId = context.Items["CorrelationId"]?.ToString()
                                ?? Activity.Current?.Id
                                ?? context.TraceIdentifier;

            // 3. Set standard HTTP server error status code
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            // 4. Build secure, non-leaking production payload
            var response = new ApiResponse<object>
            {
                Success = false,
                Message = "An unexpected error occurred.",
                TraceId = correlationId,
                Errors = null
            };

            // 5. Append diagnostic data only in local/development environment instances
            if (_environment.IsDevelopment())
            {
                response.Errors = new
                {
                    Detail = ex.Message,
                    StackTrace = ex.StackTrace
                };
            }

            // 6. Write JSON to response channel (Content-Type header is managed automatically)
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
