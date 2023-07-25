using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews
{
    public class List
    {
        public class Query : IRequest<Result<List<Review>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Review>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Review>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reviews = await _context.Reviews
                    .Include(p => p.Photos)
                    .OrderByDescending(d => d.Date)
                    .ToListAsync();
                if (reviews == null) return null;
                return Result<List<Review>>.Success(reviews);
            }
        }
    }
}