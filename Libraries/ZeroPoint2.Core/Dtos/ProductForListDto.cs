using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class ProductForListDto
    {
        public int Id { get; set; }
        public string Thumbnail { get; set; }
        public string ShortDescription { get; set; }
        public string Price { get; set; }
    }
}
