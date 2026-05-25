namespace Lentis.Api.Responses;

public class ApiResponse<T>
{
    // Indicates whether the request succeeded
    public bool Success { get; set; }

    // Human-readable message for frontend display
    public string Message { get; set; } = string.Empty;

    // Optional response payload
    public T? Data { get; set; }

    // Optional error details
    // Useful later for validation responses
    public object? Errors { get; set; }

    // Production Tracking: Included in all responses to trace distributed requests
    public string? TraceId { get; set; }
}