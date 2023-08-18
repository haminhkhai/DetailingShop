using Application.ReCaptcha;
using Application.Reviews;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateReview(ReviewDto review)
        {
            var captchaResult = await Mediator.Send(new Verify.Command { Token = review.CaptchaToken });
            if (captchaResult.IsSuccess)
                return HandleResult(await Mediator.Send(new Add.Command { Review = review }));
            else 
                return BadRequest("I'm top");
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            return HandleResult<List<Review>>(await Mediator.Send(new List.Query { }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> SetShow(Guid id)
        {
            return HandleResult(await Mediator.Send(new SetShow.Command { Id = id }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}