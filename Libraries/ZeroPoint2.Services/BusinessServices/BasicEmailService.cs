using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using ZeroPoint2.Core.Dtos;
using ZeroPoint2.Helper;

namespace ZeroPoint2.Services
{
    public class BasicEmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public BasicEmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task<ExecutionResponse<bool>> SendSimpleEmail(ContactFormDto contactFormDto)
        {
            ExecutionResponse<bool> executionResponse = new ExecutionResponse<bool>();

            var smtpClient = new SmtpClient(_config.GetSection("Smtp:Host").Value)
            {
                Port = int.Parse(_config.GetSection("Smtp:Port").Value),
                Credentials = new NetworkCredential(_config.GetSection("Smtp:Username").Value,
                _config.GetSection("Smtp:Password").Value),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_config.GetSection("Smtp:Username").Value),
                Subject = String.Format("Contact submission from: {0} : {1}",contactFormDto.Name, contactFormDto.EmailAddress),
                Body = String.Format("<P>{0}</p>", contactFormDto.Message),
                IsBodyHtml = true,
            };
            mailMessage.To.Add(_config.GetSection("AppSettings:ContactEmail").Value);

            smtpClient.Send(mailMessage);

            executionResponse.Result = true;
            executionResponse.RequestStatus = ExecutionStatus.Success;
            executionResponse.Message = "Contact form submitted successfully.";
            return executionResponse;
        }
    }
}
