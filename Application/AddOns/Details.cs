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
    public class Details
    {
        public class Query : IRequest<Result<AddOnDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AddOnDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<AddOnDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var addOn = await _context.AddOns
                    .Where(a => a.Id == request.Id)
                    .Include(a => a.Service)
                    .ProjectTo<AddOnDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();

                if (addOn == null) return null;

                return Result<AddOnDto>.Success(addOn);
            }
        }
    }
}