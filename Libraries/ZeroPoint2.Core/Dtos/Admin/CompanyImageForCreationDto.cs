using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class CompanyImageForCreationDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsLogo { get; set; }
        public int? CompanyId { get; set; }
        public int? CompanyFeatureId { get; set; }
    }
}
