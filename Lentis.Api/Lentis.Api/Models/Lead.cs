namespace Lentis.Api.Models
{
    public class Lead
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Email { get; set; } = "";

        public string Message { get; set; } = "";

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    }
}
