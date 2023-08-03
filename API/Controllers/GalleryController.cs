using Application.Galleries;
using Application.Photos;
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

        [HttpPut("{id}")]
        public async Task<ActionResult> AddPhoto(Guid id, PhotoDto photo)
        {
            return HandleResult(await Mediator.Send(new AddPhoto.Command { Photo = photo, GalleryId = id }));
        }

        [HttpPut]
        public async Task<ActionResult> EditGallery(Gallery gallery)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Gallery = gallery }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGallery(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}