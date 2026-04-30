using Lentis.Api.Data;
using Lentis.Api.Models;
// using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Resend;


namespace Lentis.Api.Controllers
{
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
}
