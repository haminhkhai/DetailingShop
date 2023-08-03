using Application.Services;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ServiceController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddService(Service service)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Service = service }));
        }

        [HttpGet]
        public async Task<ActionResult> GetServices()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetService(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut]
        public async Task<ActionResult> EditService(Service service)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Service = service }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteService(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}