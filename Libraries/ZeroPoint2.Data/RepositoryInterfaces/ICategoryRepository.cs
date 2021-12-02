using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetTopMenuCategoriesAsync();
    }
}
