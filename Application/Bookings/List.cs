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

namespace Application.Bookings
{
    public class List
    {
        public class Query : IRequest<Result<List<BookingDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<BookingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<BookingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookingList = await _context.Bookings
                    .Include(b => b.BookingAddOns)
                    .ProjectTo<BookingDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(b => b.Date)
                    .ToListAsync();
                return Result<List<BookingDto>>.Success(bookingList);
            }
        }
    }
}