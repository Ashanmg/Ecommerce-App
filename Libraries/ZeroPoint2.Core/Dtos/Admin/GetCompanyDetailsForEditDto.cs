using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class GetCompanyDetailsForEditDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyInfo { get; set; }
        public string ReturnablePolicy { get; set; }
        public string ImageUrl { get; set; }
        public List<GetCompanyFeatureForEditDto> CompanyContent { get; set; }
    }
}
