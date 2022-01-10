using Microsoft.EntityFrameworkCore;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<ProductSize> productSizes { get; set; }
        public DbSet<ProductCombination> ProductCombinations { get; set; }
        public DbSet<ColorType> ColorTypes { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
    }
}
