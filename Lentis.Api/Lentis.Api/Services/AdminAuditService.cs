using Lentis.Api.Data;
using Lentis.Api.Models;
using System.Text.Json;

namespace Lentis.Api.Services;

public interface IAdminAuditService
{
    Task LogAsync(
        string action,
        string entityType,
        int? entityId = null,
        string? performedBy = null,
        string? ipAddress = null,
        object? details = null);
}

public class AdminAuditService : IAdminAuditService
{
    private readonly AppDbContext _db;

    public AdminAuditService(AppDbContext db)
    {
        _db = db;
    }

    public async Task LogAsync(
        string action,
        string entityType,
        int? entityId = null,
        string? performedBy = null,
        string? ipAddress = null,
        object? details = null)
    {
        var auditLog = new AdminAuditLog
        {
            Action = action,
            EntityType = entityType,
            EntityId = entityId,
            PerformedBy = performedBy,
            IpAddress = ipAddress,
            DetailsJson = details is null
                ? null
                : JsonSerializer.Serialize(details),
            CreatedAtUtc = DateTime.UtcNow
        };

        _db.AdminAuditLogs.Add(auditLog);
        await _db.SaveChangesAsync();
    }
}