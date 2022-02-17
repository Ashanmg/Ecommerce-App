using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class UploadProductForCreationDto
    {
        // product information section
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public decimal AvailableQuantity { get; set; }
        public int CompanyId { get; set; }
        public bool MadeForOrder { get; set; }
        public string ProductionTime { get; set; }
        public string ProductType { get; set; }
        public string UnitOfMeasure { get; set; }
        public bool ShowOnHomePage { get; set; }


        // product price section
        public decimal RetailPrice { get; set; }
        public decimal WholeSalePrice { get; set; }
        public decimal Discount { get; set; }
        public bool IstaxIncluded { get; set; }
        public int TaxCategoryId { get; set; }


        //proudct shipping section
        public string ShippingDescription { get; set; }
        public decimal Weight { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string LengthWidthHeightType { get; set; }
        public string WeightType { get; set; }
        public string ShippingNote { get; set; }


        //product inventory section
        public bool IsInventoryTracked { get; set; }
        public decimal MinCartQuantity { get; set; }
        public decimal MaxCartQuantity { get; set; }
        public string AllowedQuantity { get; set; }
        public bool IsReturnable { get; set; }


        // product images section
        public List<IFormFile> ProductImages { get; set; }


        // proudct attributes section
        public List<ProductColorForCreationDto> Colors { get; set; }
        public string Sizes { get; set; }
        public string SizeGuide { get; set; }
        public string ProductSpecification { get; set; }
    }
}
