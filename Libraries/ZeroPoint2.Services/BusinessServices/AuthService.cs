using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Core.Entities;
using ZeroPoint2.Data;
using ZeroPoint2.Helper;

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

        public async Task<ExecutionResponse<bool>> ForgetPassword(string email)
        {          
            ExecutionResponse<bool> response = new ExecutionResponse<bool>();
            try
            {
                var user = await _authRepository.GetUserByEmail(email);

                if (user != null)
                {
                    user.PasswordResetToken = Guid.NewGuid();
                    user.IsTokenUsed = false;
                    user.TokenCreatedOnUtc = DateTime.UtcNow;

                    await _authRepository.UpdateUser(user);


                    // then send the email to the relevant email address.
                }

            }
            catch (Exception ex)
            {
                response.Message = "Internal server error.";
                response.ExceptionData = ex.Message;
                response.RequestStatus = ExecutionStatus.Error;
            }

            return response;
        }
    }
}
