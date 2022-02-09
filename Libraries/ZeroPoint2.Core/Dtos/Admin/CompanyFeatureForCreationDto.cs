using Microsoft.AspNetCore.Http;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class CompanyFeatureForCreationDto
    {
        public int Id { get; set; }
        public string FeatureTitle { get; set; }
        public string FeatureSummary { get; set; }
        public bool IsImageLeftAligned { get; set; }
        public IFormFile FeatureImage { get; set; }
    }
}
