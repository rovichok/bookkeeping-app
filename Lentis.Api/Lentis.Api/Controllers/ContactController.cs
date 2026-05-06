using Lentis.Api.Data;
using Lentis.Api.Models;
using Microsoft.AspNetCore.Authorization;

// using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Resend;


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

    [EnableRateLimiting("contactPolicy")]
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactRequest request)
    {
        var name = request.Name.Trim();
        var emailAddress = request.Email.Trim();
        var message = request.Message.Trim();

        // Block bots silently 
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            _logger.LogWarning("Honeypot triggered on contact form.");

            return Ok(new
            {
                message = "Message received successfully."
            });
        }

        var lead = new Lead
        {
            Name = name,
            Email = emailAddress,
            Message = message,
            CreatedAtUtc = DateTime.UtcNow
        };

        _db.Leads.Add(lead);
        await _db.SaveChangesAsync();

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
            _logger.LogInformation("Contact form submitted by {Email}", emailAddress);

            await _resend.EmailSendAsync(emailMessage);

            return Ok(new
            {
                message = "Message received and email sent."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending contact email");

            return StatusCode(500, new
            {
                message = "Something went wrong while sending your message.",
                errorCode = "EMAIL_SERVICE_FAILURE",
                timestamp = DateTime.UtcNow
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

    public LeadsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetLeads(
    int page = 1,
    int pageSize = 10,
    string? search = null,
    string sortBy = "createdAtUtc",
    string sortDirection = "desc")
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var query = _db.Leads.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var value = $"%{search.Trim()}%";

            query = query.Where(l =>
                EF.Functions.ILike(l.Name, value) ||
                EF.Functions.ILike(l.Email, value) ||
                EF.Functions.ILike(l.Message, value)
            );
        }

        var isDesc = sortDirection.Equals("desc", StringComparison.OrdinalIgnoreCase);

        query = sortBy.ToLower() switch
        {
            "name" => isDesc
                ? query.OrderByDescending(l => l.Name)
                : query.OrderBy(l => l.Name),

            "email" => isDesc
                ? query.OrderByDescending(l => l.Email)
                : query.OrderBy(l => l.Email),

            "message" => isDesc
                ? query.OrderByDescending(l => l.Message)
                : query.OrderBy(l => l.Message),

            "createdatutc" => isDesc
                ? query.OrderByDescending(l => l.CreatedAtUtc)
                : query.OrderBy(l => l.CreatedAtUtc),

            _ => query.OrderByDescending(l => l.CreatedAtUtc)
        };

        var totalCount = await query.CountAsync();

        var totalPages = Math.Max(
            1,
            (int)Math.Ceiling(totalCount / (double)pageSize)
        );

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(l => new
            {
                l.Id,
                l.Name,
                l.Email,
                l.Message,
                l.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new
        {
            items,
            page,
            pageSize,
            totalCount,
            totalPages
        });
    }
}

