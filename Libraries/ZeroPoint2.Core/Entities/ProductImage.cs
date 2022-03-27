using System;

namespace ZeroPoint2.Core.Entities
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string MimeType { get; set; }
        public string SeoFileName { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public DateTime DateAddedOnUtc { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}
