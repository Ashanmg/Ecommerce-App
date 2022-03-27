using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZeroPoint2.Core.Entities
{
    public class ProductColor
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public string ColorName { get; set; }
        [MaxLength(10)]
        public string ColorHashValue { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime UpdatedOnUtc { get; set; }
        public ICollection<ProductSize> ProductSizes { get; set; }
    }
}
