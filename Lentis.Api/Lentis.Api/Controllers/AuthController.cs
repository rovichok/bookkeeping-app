using Lentis.Api.Models.Dto.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Lentis.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IConfiguration configuration, ILogger<AuthController> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    [EnableRateLimiting("AdminLoginPolicy")]
    [HttpPost("login")]
    public IActionResult Login([FromBody] AdminLoginDto request)
    {
        var adminEmail = _configuration["AdminCredentials:Email"];
        var adminPasswordHash = _configuration["AdminCredentials:PasswordHash"];

        if (string.IsNullOrWhiteSpace(adminEmail) ||
            string.IsNullOrWhiteSpace(adminPasswordHash))
        {
            return StatusCode(500, new
            {
                message = "Admin authentication is not configured."
            });
        }

        if (request.Email != adminEmail)
        {
            _logger.LogWarning(
                "Failed admin login attempt for {Email}",
                request.Email
            );
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        bool isValidPassword = BCrypt.Net.BCrypt.Verify(
            request.Password,
            adminPasswordHash
        );

        if (!isValidPassword)
        {
            _logger.LogWarning(
            "Failed admin password verification for {Email}",
            request.Email
            );

            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var token = CreateToken(request.Email);

        _logger.LogInformation(
            "Admin login successful for {Email}",
            request.Email
        );

        Response.Cookies.Append("lentis_admin", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Domain = ".lentisgroup.com",
            Expires = DateTimeOffset.UtcNow.AddHours(2),
            Path = "/"
        });

        return Ok(new { message = "Logged in" });
    }

    private string CreateToken(string email)
    {
        var jwtKey = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is missing.");

        var jwtIssuer = _configuration["Jwt:Issuer"]
            ?? throw new InvalidOperationException("Jwt:Issuer is missing.");

        var jwtAudience = _configuration["Jwt:Audience"]
            ?? throw new InvalidOperationException("Jwt:Audience is missing.");

        var claims = new[]
        {
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        return Ok(new
        {
            isAuthenticated = true,
            email
        });
    }

    // Logout
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Appends a cookie with an expired date to force the browser to delete it
        Response.Cookies.Delete("lentis_admin", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Path = "/" // MUST match the path used when the cookie was created
        });

        return Ok(new { message = "Logged out" });
    }

}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}