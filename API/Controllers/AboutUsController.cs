using Application.About;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AboutUsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetAboutUs()
        {
            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

        [HttpPut]
        public async Task<ActionResult> EditAboutUs(AboutUs aboutUs)
        {
            return HandleResult(await Mediator.Send(new Edit.Command{ AboutUs = aboutUs }));
        }

        [HttpPost]
        public async Task<IActionResult> EditImage([FromForm] UploadImage.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}