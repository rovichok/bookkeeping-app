using Lentis.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Lentis.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Lead> Leads => Set<Lead>();
    }
}
