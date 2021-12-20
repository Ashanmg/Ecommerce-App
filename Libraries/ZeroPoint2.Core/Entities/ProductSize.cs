using System;
using System.ComponentModel.DataAnnotations;

namespace ZeroPoint2.Core.Entities
{
    public class ProductSize
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string Size { get; set; }
        public int ProductColorId { get; set; }
        public ProductColor ProductColor { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime UpdatedOnUtc { get; set; }
    }
}
