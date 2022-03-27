using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Core.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int UserRoleId { get; set; }
    }
}
