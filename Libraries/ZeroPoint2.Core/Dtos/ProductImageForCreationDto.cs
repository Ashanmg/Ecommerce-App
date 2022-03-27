using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class ProductImageForCreationDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public DateTime DateAddedOnUtc { get; set; }
        public int ProductId { get; set; }
    }
}
