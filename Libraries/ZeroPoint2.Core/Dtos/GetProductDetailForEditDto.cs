using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Core.Dtos
{
    public class GetProductDetailForEditDto
    {
        // product information section
        public ProductInformationDto ProductInformation { get; set; }

        // product price section
        public PriceDto Price { get; set; }

        //proudct shipping section
        public ShippingDto Shipping { get; set; }

        //product inventory section
        public InventoryDto Inventory { get; set; }

        // product images section
        public List<ProductImageDto> Images { get; set; }

        // proudct attributes section
        public ProductAttributeDto ProductAttributes { get; set; }
    }

    public class ProductInformationDto
    {
        // product information section
        public int Id { get; set; }
        public int? ProductCategoryId { get; set; }
        public int? ProductSubCategoryId { get; set; }
        public int? ProductChildCategoryId { get; set; }
        public string Name { get; set; }
        public string SupplierProductCode { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public decimal? AvailableQuantity { get; set; }
        public int CompanyId { get; set; }
        public bool MadeForOrder { get; set; }
        public string ProductionTime { get; set; }
        public string ProductType { get; set; }
        public string UnitOfMeasure { get; set; }
        public bool ShowOnHomePage { get; set; }
    }

    public class PriceDto
    {
        public decimal RetailPrice { get; set; }
        public decimal WholeSalePrice { get; set; }
        public decimal? Discount { get; set; }
        public bool IstaxIncluded { get; set; }
        public int? TaxCategoryId { get; set; }
    }

    public class ShippingDto
    {
        public string ShippingDescription { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Length { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public string LengthWidthHeightType { get; set; }
        public string WeightType { get; set; }
        public string ShippingNote { get; set; }
    }

    public class InventoryDto
    {
        public bool IsInventoryTracked { get; set; }
        public decimal? MinCartQuantity { get; set; }
        public decimal? MaxCartQuantity { get; set; }
        public string AllowedQuantity { get; set; }
        public bool IsReturnable { get; set; }
    }

    public class ProductImageDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
    }

    public class ProductAttributeDto
    {
        public List<ProductColorForCreationDto> Colors { get; set; }
        public string Sizes { get; set; }
        public string SizeGuide { get; set; }
        public string ProductSpecification { get; set; }
    }
}
