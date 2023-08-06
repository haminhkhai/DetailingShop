using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AddOns;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddOnController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAddOns()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetAddOn(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult> CreateAddOn(AddOn addOn)
        {
            return HandleResult(await Mediator.Send(new Add.Command { AddOn= addOn }));
        }

        [HttpPut]
        public async Task<ActionResult> EditAddOn(AddOn addOn)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { AddOn = addOn }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAddOn(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}