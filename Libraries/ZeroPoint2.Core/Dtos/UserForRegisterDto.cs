using System.ComponentModel.DataAnnotations;

namespace ZeroPoint2.Core.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 20 characters.")]
        public string Password { get; set; }
    }
}
