using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public interface ICategoryService
    {
        Task<ExecutionResponse<List<CategoryForMenuDto>>> GetTopMenuCategoriesAsync();
    }
}
