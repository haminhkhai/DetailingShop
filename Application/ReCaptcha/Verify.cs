using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.ReCaptcha
{
    public class Verify
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Token { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IHttpClientFactory _httpClientFactory;
            private readonly IConfiguration _config;
            public Handler(IHttpClientFactory httpClientFactory, IConfiguration config)
            {
                _config = config;
                _httpClientFactory = httpClientFactory;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                string siteKey;
                if (env == "Development") siteKey = _config["CaptchaSecretKey"];
                else siteKey = Environment.GetEnvironmentVariable("CAPTCHA_SECRET_KEY");
                var verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=";
           
                // verifyURL + key + "&response=" + request.Token
                var httpRequestMessage = new HttpRequestMessage(
                    HttpMethod.Post,
                    String.Format("{0}{1}&response={2}", verifyURL, siteKey, request.Token)
                );

                var httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                var result = await httpResponseMessage.Content.ReadAsStringAsync();

                if (result.IndexOf("false") == -1) return Result<Unit>.Success(Unit.Value);
                else return Result<Unit>.Failure("Can't verify captcha");
            }
        }
    }
}