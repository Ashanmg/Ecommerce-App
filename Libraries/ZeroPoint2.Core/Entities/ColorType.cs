using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class ColorType
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public string ColorName { get; set; }
        [MaxLength(10)]
        public string ColorCode { get; set; }
        [MaxLength(10)]
        public string ColorHashValue { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime UpdatedOnUtc { get; set; }
    }
}
