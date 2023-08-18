using Application.Core;
using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Configuration;

namespace Application.Bookings
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BookingDto Booking { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Booking).SetValidator(new BookingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FindAsync(request.Booking.Service.Id);

                var booking = new Booking();

                //ignore bookingAddOns
                _mapper.Map(request.Booking, booking);

                booking.Service = service;
                booking.Date = DateTime.UtcNow;

                var bookingAddOns = new List<BookingAddOn>();
                foreach (var addOn in request.Booking.BookingAddOns)
                {
                    var newBookingAddOn = new BookingAddOn
                    {
                        AddOn = await _context.AddOns.FindAsync(addOn.Id),
                        Booking = booking,
                        AddOnPrice = addOn.Price
                    };
                    bookingAddOns.Add(newBookingAddOn);
                }
                booking.BookingAddOns = bookingAddOns;

                _context.Bookings.Add(booking);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem adding booking");

            }
        }
    }
}