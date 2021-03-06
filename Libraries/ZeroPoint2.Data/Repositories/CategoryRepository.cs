using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;

        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetTopMenuCategoriesAsync()
        {
            return await _context.Categories.Include(src => src.ProductImage).Where(cat => cat.IncludeInTopMenu).ToListAsync();
        }

        public async Task<List<Category>> GetProductCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<int> GetParentCategoryIdByChildId(int? childId)
        {
            return await _context.Categories.Where( c => c.Id == childId).Select(c => c.ParentCategoryId).FirstOrDefaultAsync();
        }
    }
}
