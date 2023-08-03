using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Carousels;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CarouselController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateCarousel(Carousel carousel)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Carousel = carousel }));
        }

        [HttpPut]
        public async Task<ActionResult> EditCarousel(Carousel carousel)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Carousel = carousel }));
        }

        [HttpGet]
        public async Task<ActionResult> GetCarousels()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCarousel(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCarousel(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}