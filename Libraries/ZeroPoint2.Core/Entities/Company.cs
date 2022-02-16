using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class Company
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string CompanyName { get; set; }
        [MaxLength(500)]
        public string CompanySummary { get; set; }
        [MaxLength(500)]
        public string ReturnablePolicy { get; set; }
        public bool IsPublished { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
        public CompanyImage LogoImage { get; set; }
    }
}
