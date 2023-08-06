using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Bookings;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateBooking(BookingDto booking)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Booking = booking }));
        }

        [HttpGet]
        public async Task<ActionResult> GetBookings([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Comamnd { Id = id }));
        }
    }
}