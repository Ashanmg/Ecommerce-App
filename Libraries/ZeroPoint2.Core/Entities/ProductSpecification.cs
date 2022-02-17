using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class ProductSpecification
    {
        public int Id { get; set; }
        public string SpecificationType { get; set; }
        public string SpecificationValue { get; set; }
        public int ProductId { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public Product Product { get; set; }
    }
}
