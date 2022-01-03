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
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal WholeSalePrice { get; set; }
        public decimal Weight { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string LengthWidthHeightType { get; set; }
        public string WeightType { get; set; }
        public decimal AvailableQuantity { get; set; }
        public string ProductionTime { get; set; }
        public string CompanyName { get; set; }
        public string CompanyInformation { get; set; }
        public bool NotReturnable { get; set; }
        public string ReturnInformation { get; set; }
        public List<ProductColorForCreationDto> Colors { get; set; }
        public string Sizes { get; set; }
        public bool ShowOnHomePage { get; set; }
        public List<IFormFile> ProductImages { get; set; }
    }
}
