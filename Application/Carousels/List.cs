using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carousels
{
    public class List
    {
        public class Query : IRequest<Result<List<Carousel>>>
        { }

        public class Handler : IRequestHandler<Query, Result<List<Carousel>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Carousel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var carousels = await _context.Carousels
                    .OrderBy(c => c.Id)
                    .ToListAsync();
                return Result<List<Carousel>>.Success(carousels);
            }
        }
    }
}