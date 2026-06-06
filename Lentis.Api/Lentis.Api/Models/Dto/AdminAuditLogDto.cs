namespace Lentis.Api.Dtos;

public record AdminAuditLogDto(
    int Id,
    string Action,
    string EntityType,
    int? EntityId,
    string? PerformedBy,
    string? IpAddress,
    string? DetailsJson,
    DateTime CreatedAtUtc
);