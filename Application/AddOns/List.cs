using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AddOns
{
    public class List
    {
        public class Query : IRequest<Result<List<AddOnDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<AddOnDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<AddOnDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var addOns = await _context.AddOns
                    // .Include(a => a.Service)
                    .ProjectTo<AddOnDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                return Result<List<AddOnDto>>.Success(addOns);
            }
        }
    }
}