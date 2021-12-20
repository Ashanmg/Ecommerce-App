using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class ProductColorForCreationDto
    {
        public int Id { get; set; }
        public string ColorName { get; set; }
        public string ColorHashValue { get; set; }
        public int ProductId { get; set; }
    }
}
