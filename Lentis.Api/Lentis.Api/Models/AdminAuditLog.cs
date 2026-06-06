namespace Lentis.Api.Models;

public class AdminAuditLog
{
    public int Id { get; set; }

    public string Action { get; set; } = string.Empty;

    public string EntityType { get; set; } = string.Empty;

    public int? EntityId { get; set; }

    public string? PerformedBy { get; set; }

    public string? IpAddress { get; set; }

    public string? DetailsJson { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}