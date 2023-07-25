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

namespace Application.Services
{
    public class List
    {
        public class Query : IRequest<Result<List<ServiceDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<ServiceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ServiceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var services = await _context.Services
                    .Include(a => a.AddOns)
                    .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                    .OrderBy(s => s.VehicleType)
                    .ToListAsync();
                if (services == null) return null;
                return Result<List<ServiceDto>>.Success(services);
            }
        }
    }
}