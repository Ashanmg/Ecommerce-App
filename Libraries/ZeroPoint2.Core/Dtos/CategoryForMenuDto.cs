using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class CategoryForMenuDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CategoryImageUrl { get; set; }
        public int ParentCategoryId { get; set; }
        public List<CategoryForMenuDto> ChildCategoryList { get; set; }
    }
}
