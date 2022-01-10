using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZeroPoint2.Core.Entities
{
    public class UserRole
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string RoleName { get; set; }
        [MaxLength(255)]
        public string SystemName { get; set; }
        public bool Active { get; set; }
        public bool IsSystemRole { get; set; }
        public DateTime CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
}
