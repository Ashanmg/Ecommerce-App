using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos
{
    public class ProductForDetailDto
    {
        public string ProductName { get; set; }
        public string ProductShortDescription { get; set; }
        public string ProductLongDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public List<string> ProductImages { get; set; }
        public decimal ProductQuantity { get; set; }
        public List<string> ProductSizes { get; set; }
        public List<ColorDto> ProductColors { get; set; }
        public ShippingDetailDto ShippingDetails { get; set; }
    }

    public class ShippingDetailDto
    {
        public string ShippingType { get; set; }
        public decimal ShippingCost { get; set; }
        public string ShippingTime { get; set; }
        public string ShippingDetails { get; set; }
    }
}
