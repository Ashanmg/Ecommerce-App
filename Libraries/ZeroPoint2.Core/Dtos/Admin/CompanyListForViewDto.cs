using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Dtos.Admin
{
    public class CompanyListForViewDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanySummary { get; set; }
        public bool IsPublished { get; set; }
        public string LogoImageUrl { get; set; }
    }
}
