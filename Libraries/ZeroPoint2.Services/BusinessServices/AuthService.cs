using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Data;

namespace ZeroPoint2.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<User> RegisterAsync(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = new User
            {
                Name = userForRegisterDto.Name,
                Email = userForRegisterDto.Email
            };

            var createdUser = await _authRepository.RegisterAsync(userToCreate, userForRegisterDto.Password);

            return createdUser;
        }

        public async Task<User> LoginAsync(UserForLoginDto userForRegisterDto)
        {
            return await _authRepository.LoginAsync(userForRegisterDto.Email, userForRegisterDto.Password);
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _authRepository.UserExistsAsync(email);
        }
    }
}
