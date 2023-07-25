using Microsoft.AspNetCore.Mvc;
using Application.Login;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var result = await Mediator.Send(new Account.Query {LoginDto = loginDto});
            if (result.Error == "Invalid username or password") return Unauthorized();
            return HandleResult(result);
        }
    }
}