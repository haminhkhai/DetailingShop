using Application.Reviews;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateReview([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

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