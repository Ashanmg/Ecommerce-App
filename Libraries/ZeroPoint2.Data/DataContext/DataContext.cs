using Microsoft.EntityFrameworkCore;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
