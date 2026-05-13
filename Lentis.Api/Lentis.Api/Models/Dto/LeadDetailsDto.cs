using System;

namespace Lentis.Api.Models.Dto;

public record LeadDetailsDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public DateTime CreatedAtUtc { get; init; }

    // This constructor enables the "new LeadDetailsDto(lead.Id, ...)" syntax in your controller
    public LeadDetailsDto(int id, string name, string email, string message, DateTime createdAtUtc)
    {
        Id = id;
        Name = name;
        Email = email;
        Message = message;
        CreatedAtUtc = createdAtUtc;
    }
}
