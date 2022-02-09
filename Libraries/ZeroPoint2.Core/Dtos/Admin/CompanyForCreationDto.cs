using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class CompanyForCreationDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanySummary { get; set; }
        public IFormFile CompanyLogoImage { get; set; }
        public List<CompanyFeatureForCreationDto> CompanyFeatures { get; set; }
    }
}
