using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ReCaptcha;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReCaptchaController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> VerifyCaptcha([FromBody]string token)
        {
            return HandleResult(await Mediator.Send(new Verify.Command { Token = token }));
        }
    }
}