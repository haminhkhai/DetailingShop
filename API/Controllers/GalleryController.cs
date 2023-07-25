using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Galleries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GalleryController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateGallery(Gallery gallery)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Gallery = gallery }));
        }

        [HttpGet]
        public async Task<ActionResult> GetGalleries()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGallery(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut]
        public async Task<ActionResult> AddPhoto([FromForm] AddPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGallery(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}