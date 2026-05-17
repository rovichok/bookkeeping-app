using Lentis.Api.Responses;
using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Text.Json;

namespace Lentis.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _environment;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IWebHostEnvironment environment)
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
            _logger.LogError(
                ex,
                "Unhandled exception for {Method} {Path}",
                 context.Request.Method,
                 context.Request.Path
            );

            // Set response content type
            context.Response.ContentType = "application/json";

            // Default to HTTP 500
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            // Create standardized error response
            var response = new ApiResponse<object>
            {
                Success = false,
                Message = "An unexpected error occurred."
            };

            // In development only, expose exception details
            // Never expose raw exceptions in production
            if (_environment.IsDevelopment())
            {
                response.Errors = new
                {
                    Detail = ex.Message
                };
            }

            // Return JSON response
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}