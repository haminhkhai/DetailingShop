using Application.About;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AboutUsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAboutUs()
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

        [HttpPut]
        public async Task<ActionResult> EditAboutUs(AboutUs aboutUs)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { AboutUs = aboutUs }));
        }

        [HttpPost]
        public async Task<IActionResult> EditImage(PhotoDto photo)
        {
            return HandleResult(await Mediator.Send(new AddPhoto.Comamnd { Photo = photo }));
        }
    }
}