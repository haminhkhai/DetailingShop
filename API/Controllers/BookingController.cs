using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Bookings;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateBooking(BookingDto booking)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Booking = booking }));
        }

        [HttpGet]
        public async Task<ActionResult> GetBookings()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Comamnd { Id = id }));
        }
    }
}