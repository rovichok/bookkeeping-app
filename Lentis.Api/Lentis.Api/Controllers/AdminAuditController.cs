using Lentis.Api.Data;
using Lentis.Api.Dtos;
using Lentis.Api.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/admin/audit")]
public class AdminAuditController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminAuditController(AppDbContext db)
    {
        _db = db;
    }

    //[Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAuditLogs(int page = 1, int pageSize = 25)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var logs = await _db.AdminAuditLogs
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AdminAuditLogDto(
                x.Id,
                x.Action,
                x.EntityType,
                x.EntityId,
                x.PerformedBy,
                x.IpAddress,
                x.DetailsJson,
                x.CreatedAtUtc))
            .ToListAsync();

        return Ok(new ApiResponse<List<AdminAuditLogDto>>
        {
            Success = true,
            Message = "Audit logs retrieved successfully.",
            Data = logs
        });
    }
}