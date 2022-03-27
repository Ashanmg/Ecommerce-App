using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using System;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using ZeroPoint2.Core;
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

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("NoReply", _config.GetSection("Smtp:Username").Value));
            message.To.Add(new MailboxAddress("Richard", _config.GetSection("AppSettings:ContactEmail").Value));
            message.Subject = "Contact By Mail Request";

            var multipart = new Multipart("mixed")
            {
                new TextPart(TextFormat.Html) { Text = string.Format("<P>Name: {0}</p></br><P>Email: {1}</p></br><P>Message: {2}</p>", contactFormDto.Name, contactFormDto.EmailAddress, contactFormDto.Message) }
            };

            message.Body = multipart;

            var emailAccount = new EmailAccount();
            emailAccount.Port = int.Parse(_config.GetSection("Smtp:Port").Value);
            emailAccount.Host = _config.GetSection("Smtp:Host").Value;
            emailAccount.Username = _config.GetSection("Smtp:Username").Value;
            emailAccount.Password = _config.GetSection("Smtp:Password").Value;
            emailAccount.EnableSsl = true;
            emailAccount.UseDefaultCredentials = false;

            using var smtpClient = await BuildAsync(emailAccount);
            await smtpClient.SendAsync(message);
            await smtpClient.DisconnectAsync(true);

            executionResponse.Result = true;
            executionResponse.RequestStatus = ExecutionStatus.Success;
            executionResponse.Message = "Contact form submitted successfully.";
            return executionResponse;
        }

        #region Methods

        /// <summary>
        /// Create a new SMTP client for a specific email account
        /// </summary>
        /// <param name="emailAccount">Email account to use. If null, then would be used EmailAccount by default</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the an SMTP client that can be used to send email messages
        /// </returns>
        public virtual async Task<SmtpClient> BuildAsync(EmailAccount emailAccount = null)
        {
            var client = new SmtpClient
            {
                ServerCertificateValidationCallback = ValidateServerCertificate
            };

            try
            {
                await client.ConnectAsync(
                    emailAccount.Host,
                    emailAccount.Port,
                    emailAccount.EnableSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTlsWhenAvailable);

                if (emailAccount.UseDefaultCredentials)
                {
                    await client.AuthenticateAsync(CredentialCache.DefaultNetworkCredentials);
                }
                else if (!string.IsNullOrWhiteSpace(emailAccount.Username))
                {
                    await client.AuthenticateAsync(new NetworkCredential(emailAccount.Username, emailAccount.Password));
                }

                return client;
            }
            catch (Exception ex)
            {
                client.Dispose();
                throw new Exception(ex.Message, ex);
            }
        }

        /// <summary>
        /// Validates the remote Secure Sockets Layer (SSL) certificate used for authentication.
        /// </summary>
        /// <param name="sender">An object that contains state information for this validation.</param>
        /// <param name="certificate">The certificate used to authenticate the remote party.</param>
        /// <param name="chain">The chain of certificate authorities associated with the remote certificate.</param>
        /// <param name="sslPolicyErrors">One or more errors associated with the remote certificate.</param>
        /// <returns>A System.Boolean value that determines whether the specified certificate is accepted for authentication</returns>
        public virtual bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            //By default, server certificate verification is disabled.
            return true;
        }

        #endregion
    }
}
