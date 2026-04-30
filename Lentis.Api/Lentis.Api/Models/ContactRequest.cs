using System.ComponentModel.DataAnnotations;

namespace Lentis.Api.Models
{
    public class ContactRequest
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters.")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Email cannot be longer than 150 characters.")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Message is required.")]
        [StringLength(2000, MinimumLength = 10, ErrorMessage = "Message must be between 10 and 2000 characters.")]
        public string Message { get; set; } = "";
    }
}
