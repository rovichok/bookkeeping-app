using System.ComponentModel.DataAnnotations;

namespace Lentis.Api.Models.Dto.Leads;

public class UpdateLeadDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = "";

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = "";

    [Required]
    [StringLength(2000, MinimumLength = 10)]
    public string Message { get; set; } = "";
}
