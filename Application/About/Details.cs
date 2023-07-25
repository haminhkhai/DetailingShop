using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.About
{
    public class Details
    {
        public class Query : IRequest<Result<AboutUs>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<AboutUs>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<AboutUs>> Handle(Query request, CancellationToken cancellationToken)
            {
                var aboutUs = await _context.AboutUs.SingleOrDefaultAsync();

                if (aboutUs == null) return Result<AboutUs>.Failure("Problem loading about us");
                return Result<AboutUs>.Success(aboutUs);
            }
        }
    }
}