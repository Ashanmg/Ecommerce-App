using System;
using System.ComponentModel.DataAnnotations;

namespace ZeroPoint2.Core.Entities
{
    public class ProductCombination
    {
        public int Id { get; set; }
        [MaxLength(14)]
        public string Sku { get; set; }
        public int ProductId { get; set; }
        [MaxLength(20)]
        public string ColorName { get; set; }
        [MaxLength(10)]
        public string ColorValue { get; set; }
        [MaxLength(20)]
        public string Size { get; set; }
        [MaxLength(100)]
        public string SizeDescription { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
        public Product Product { get; set; }
    }
}
