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
    public class List
    {
        public class Query : IRequest<Result<List<Gallery>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Gallery>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Gallery>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var galleries = await _context.Galleries
                    .Include(g => g.Photos)
                    .ToListAsync();

                return Result<List<Gallery>>.Success(galleries);
            }
        }
    }
}