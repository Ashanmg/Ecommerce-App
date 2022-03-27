using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class CompanyFeature
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string FeatureTitle { get; set; }
        [MaxLength(500)]
        public string FeatureSummary { get; set; }
        public bool IsImageLeftAligned { get; set; }
        public int CompanyId { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
        public Company Company { get; set; }
        [NotMapped]
        public IFormFile FeatureImage { get; set; }
    }
}
