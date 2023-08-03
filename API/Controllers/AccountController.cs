using Microsoft.AspNetCore.Mvc;
using Application.Login;
using API.Services;
using API.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers
{   
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        private readonly TokenService _tokenService;
        public AccountController(TokenService tokenService)
        {
            _tokenService = tokenService;

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await Mediator.Send(new GetUser.Query{Username = User.FindFirstValue(ClaimTypes.Name)});

            var userDto = new UserDto 
            {
                Username = user.Value.Username,
                Token = _tokenService.CreateToken(user.Value)
            };
            return userDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var result = await Mediator.Send(new Account.Query { LoginDto = loginDto });
            if (result.Error == "Invalid username or password") return Unauthorized();

            var userDto = new UserDto 
            {
                Username = result.Value.Username,
                Token = _tokenService.CreateToken(result.Value)
            };

            return userDto;
        }
    }
}