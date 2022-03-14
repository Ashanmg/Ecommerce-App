using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Helper;
using ZeroPoint2.Services;

namespace ZeroPoint2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;

        public CommonController(IConfiguration config, IEmailService emailService)
        {
            _config = config;
            _emailService = emailService;
        }

        [HttpPost]
        [Route("contactbyemail")]
        public async Task<IActionResult> ContactByEmail(ContactFormDto contactFormDto)
        {

            ExecutionResponse<bool> response = await _emailService.SendSimpleEmail(contactFormDto);
            return Ok(response);
        }
    }
}
