using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Galleries
{
    public class Details
    {
        public class Query : IRequest<Result<Gallery>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Gallery>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Gallery>> Handle(Query request, CancellationToken cancellationToken)
            {
                var gallery = await _context.Galleries
                    .Include(g => g.Photos)
                    .FirstOrDefaultAsync(g => g.Id == request.Id);
                if (gallery == null) return null;
                return Result<Gallery>.Success(gallery);
            }
        }
    }
}