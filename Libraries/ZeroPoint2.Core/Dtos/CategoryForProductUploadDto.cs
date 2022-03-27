using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class CategoryForProductUploadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentCategoryId { get; set; }
        public List<CategoryForProductUploadDto> ChildCategoryList { get; set; }
    }
}
