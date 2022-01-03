using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZeroPoint2.Core.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        public string MetaKeywords { get; set; }
        [MaxLength(500)]
        public string MetaDescription { get; set; }
        [MaxLength(9)]
        public string Sku { get; set; }
        [MaxLength(500)]
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public bool ShowOnHomePage { get; set; }
        public int OrderMinimumQuantity { get; set; }
        public int OrderMaximumQuantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal RetailPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal WholeSalePrice { get; set; }
        public int TaxCategoryId { get; set; }
        public int CategoryId { get; set; }
        public bool MarkAsNew { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Weight { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Length { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Width { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Height { get; set; }
        [MaxLength(20)]
        public string LengthWidthHeightType { get; set; }
        [MaxLength(20)]
        public string WeightType { get; set; }
        public int DisplayOrder { get; set; }
        public bool Published { get; set; }
        public bool Deleted { get; set; }
        public bool IsVariant { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal AvailableQuantity { get; set; }
        public string ProductionTime { get; set; }
        [MaxLength(200)]
        public string CompanyName { get; set; }
        [MaxLength(500)]
        public string CompanyInformation { get; set; }
        public bool NotReturnable { get; set; }
        [MaxLength(500)]
        public string ReturnInformation { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime UpdatedOnUtc { get; set; }
        public Category Category { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
    }
}
