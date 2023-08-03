using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Carousels
{
    public class Details
    {
        public class Query : IRequest<Result<Carousel>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Carousel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Carousel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var carousel = await _context.Carousels.FindAsync(request.Id);
                if (carousel == null) return null;

                return Result<Carousel>.Success(carousel);
            }
        }
    }
}