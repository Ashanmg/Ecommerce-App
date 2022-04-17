using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Entities;

namespace ZeroPoint2.Data
{
    public interface IAuthRepository
    {
        Task<User> RegisterAsync(User user, string password);
        Task<User> LoginAsync(string email, string password);
        Task<bool> UserExistsAsync(string email);
        Task<User> GetUserByEmail(string email);
        Task UpdateUser(User user);
    }
}
