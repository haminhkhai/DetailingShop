using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class Details
    {
        public class Query : IRequest<Result<Service>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Service>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Service>> Handle(Query request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FirstOrDefaultAsync(s => s.Id == request.Id);

                if (service == null) return null;
                return Result<Service>.Success(service);
            }
        }
    }
}