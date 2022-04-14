using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class GetCompanyFeatureForEditDto
    {
        public int Id { get; set; }
        public string FeatureTitle { get; set; }
        public string FeatureSummary { get; set; }
        public bool IsImageLeftAligned { get; set; }
        public string ImageUrl { get; set; }
    }
}
