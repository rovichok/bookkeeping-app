using Lentis.Api.Data;
using Lentis.Api.Models;
using Lentis.Api.Models.Dto.Leads;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Resend;
using Lentis.Api.Responses;
using System.Linq;



namespace Lentis.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IResend _resend;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IResend resend, ILogger<ContactController> logger, AppDbContext db)
    {
        _db = db;
        _resend = resend;
        _logger = logger;
    }

    [EnableRateLimiting("LeadSubmitPolicy")]
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] CreateLeadDto request)
    {
        var name = request.Name.Trim();
        var emailAddress = request.Email.Trim();
        var message = request.Message.Trim();

        // Block bots silently 
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            _logger.LogWarning(
                "[Audit] Honeypot triggered on contact form from IP {IpAddress}",
                HttpContext.Connection.RemoteIpAddress?.ToString()
            );

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Lead submitted successfully."
            });
        }

        var lead = new Lead
        {
            Name = name,
            Email = emailAddress,
            Message = message,
            CreatedAtUtc = DateTime.UtcNow
        };

        // Log inbound contact form submissions for monitoring and diagnostics
        _logger.LogInformation(
            "Processing contact form submission from {Email}",
            emailAddress
        );

        _db.Leads.Add(lead);
        await _db.SaveChangesAsync();

        // Record successful lead creation for audit and diagnostics
        _logger.LogInformation(
            "[Audit] Lead {LeadId} created successfully for {Email}",
            lead.Id,
            emailAddress
        );
        var emailMessage = new EmailMessage
        {
            From = "Lentis <onboarding@resend.dev>",
            Subject = "New Contact Form Submission",
            HtmlBody = $@"
                    <h2>New Contact Submission</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {emailAddress}</p>
                    <p><strong>Message:</strong></p>
                    <p>{message}</p>
                "
        };

        emailMessage.To.Add("ayoghagborbesong@gmail.com");

        try
        {
            _logger.LogInformation(
                "[Audit] Contact form submitted by {Email}",
                emailAddress
            );

            await _resend.EmailSendAsync(emailMessage);

            // Track successful outbound notification email delivery for lead follow-up visibility
            _logger.LogInformation(
                "[Audit] Notification email sent successfully for lead {LeadId}",
                lead.Id
            );

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Lead submitted successfully."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Contact form processing failed for {Email}",
                emailAddress
            );

            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Something went wrong while sending your message.",
                Errors = new
                {
                    ErrorCode = "EMAIL_SERVICE_FAILURE",
                    Timestamp = DateTime.UtcNow
                }
            });
        }
    }
}


// [Route("api/leads")]
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<LeadsController> _logger;

    public LeadsController(AppDbContext db, ILogger<LeadsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResponseDto<LeadDetailsDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLeads(
    int page = 1,
    int pageSize = 10,
    string? search = null,
    string sortBy = "createdAtUtc",
    string sortDirection = "desc")
    {
        // Prevent invalid pagination values
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 50);

        // Read-only query optimization
        IQueryable<Lead> query = _db.Leads.AsNoTracking();

        // ---------------------------
        // SEARCH
        // ---------------------------

        if (!string.IsNullOrWhiteSpace(search))
        {
            var value = $"%{search.Trim()}%";

            query = query.Where(l =>
                EF.Functions.ILike(l.Name, value) ||
                EF.Functions.ILike(l.Email, value) ||
                EF.Functions.ILike(l.Message, value)
            );
        }

        // ---------------------------
        // SORTING
        // ---------------------------

        bool isDesc = sortDirection.Equals(
            "desc",
            StringComparison.OrdinalIgnoreCase
        );

        query = sortBy switch
        {
            string s when s.Equals("name", StringComparison.OrdinalIgnoreCase)
                => isDesc
                    ? query.OrderByDescending(l => l.Name)
                    : query.OrderBy(l => l.Name),

            string s when s.Equals("email", StringComparison.OrdinalIgnoreCase)
                => isDesc
                    ? query.OrderByDescending(l => l.Email)
                    : query.OrderBy(l => l.Email),

            string s when s.Equals("message", StringComparison.OrdinalIgnoreCase)
                => isDesc
                    ? query.OrderByDescending(l => l.Message)
                    : query.OrderBy(l => l.Message),

            string s when s.Equals("createdAtUtc", StringComparison.OrdinalIgnoreCase)
                => isDesc
                    ? query.OrderByDescending(l => l.CreatedAtUtc)
                    : query.OrderBy(l => l.CreatedAtUtc),

            _ => query.OrderByDescending(l => l.CreatedAtUtc)
        };

        // ---------------------------
        // TOTALS
        // ---------------------------

        var totalCount = await query.CountAsync();

        var totalPages = Math.Max(
            1,
            (int)Math.Ceiling(totalCount / (double)pageSize)
        );

        // ---------------------------
        // PAGINATED DATA
        // ---------------------------

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(l => new LeadDetailsDto(
                l.Id,
                l.Name,
                l.Email,
                l.Message,
                l.CreatedAtUtc
            ))
            .ToListAsync();

        // ---------------------------
        // RESPONSE
        // ---------------------------

        var response = new PagedResponseDto<LeadDetailsDto>(
            items,
            page,
            pageSize,
            totalCount,
            totalPages
        );

        return Ok(new ApiResponse<PagedResponseDto<LeadDetailsDto>>
        {
            Success = true,
            Message = "Leads retrieved successfully.",
            Data = response
        });
    }

    // New code
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(LeadDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateLead(int id, [FromBody] UpdateLeadDto dto)
    {
        // 1. Fetch from context cache (efficient)
        var lead = await _db.Leads.FindAsync(id);

        if (lead == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = $"Lead with ID {id} not found."
            });
        }

        // 2. Map safe fields from incoming UpdateLeadDto
        lead.Name = dto.Name.Trim();
        lead.Email = dto.Email.Trim();
        lead.Message = dto.Message.Trim();

        // 3. Persist down to SQL database
        await _db.SaveChangesAsync();
        // Record successful admin lead modifications for audit tracking
        _logger.LogInformation(
            "Lead {LeadId} updated successfully by admin",
            id
        );

        // 4. Return the standardized LeadDetailsDto response
        var response = new LeadDetailsDto(
            lead.Id,
            lead.Name,
            lead.Email,
            lead.Message,
            lead.CreatedAtUtc
        );

        return Ok(new ApiResponse<LeadDetailsDto>
        {
            Success = true,
            Message = "Lead retrieved successfully.",
            Data = response
        });
    }


    // New code
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(LeadDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetLead(int id)
    {
        var lead = await _db.Leads
            .AsNoTracking()
            .Where(l => l.Id == id)
            .Select(l => new LeadDetailsDto(
                l.Id,
                l.Name,
                l.Email,
                l.Message,
                l.CreatedAtUtc
            ))
            .FirstOrDefaultAsync();

        if (lead == null)
        {
            return NotFound(new
            {
                message = $"Lead with ID {id} not found."
            });
        }

        return Ok(lead);
    }

    // New code
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteLead(int id)
    {

        // Executes a single DELETE query directly in the database.
        // This permanently wipes the row instantly without loading it into server memory first.
        int rowsAffected = await _db.Leads
            .Where(l => l.Id == id)
            .ExecuteDeleteAsync(); // Requires EF Core 7 or higher

        // If no rows were changed, the ID did not exist in the database
        if (rowsAffected == 0)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = $"Lead with ID {id} not found."
            });
        }

        // Record destructive admin actions for auditing and diagnostics
        _logger.LogWarning(
            "Lead {LeadId} deleted by admin",
            id
        );

        // Returns a clean 204 No Content success response
        return NoContent();
    }

    /*
    [HttpGet("debug")]
    public async Task<IActionResult> Debug()
    {
        var leads = await _db.Leads
            .Select(l => new
            {
                l.Id,
                l.Name
            })
            .ToListAsync();

        return Ok(leads);
    }
    */
}

