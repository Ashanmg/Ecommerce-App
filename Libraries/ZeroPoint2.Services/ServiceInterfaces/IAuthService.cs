using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(UserForRegisterDto userForRegisterDto);
        Task<User> LoginAsync(UserForLoginDto userForRegisterDto);
        Task<bool> UserExistsAsync(string email);
        Task<ExecutionResponse<bool>> ForgetPassword(string email);
    }
}
