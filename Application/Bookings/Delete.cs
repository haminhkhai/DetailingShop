using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Bookings
{
    public class Delete
    {
        public class Comamnd : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Comamnd, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Comamnd request, CancellationToken cancellationToken)
            {
                var booking = await _context.Bookings.FindAsync(request.Id);
                if (booking == null) return null;

                _context.Bookings.Remove(booking);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem deleting booking");
            }
        }
    }
}