using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = await _context.Reviews
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(r => r.Id == request.Id);

                if (review == null) return null;

                _context.Photos.RemoveRange(review.Photos);
                _context.Reviews.Remove(review);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Problem delete review");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}