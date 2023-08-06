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
        public class Query : IRequest<Result<PagedList<BookingDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BookingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PagedList<BookingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Bookings
                    .Include(b => b.BookingAddOns)
                    .OrderByDescending(b => b.Date)
                    .ProjectTo<BookingDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                return Result<PagedList<BookingDto>>.Success(
                    await PagedList<BookingDto>.CreateAsync(query, 
                        request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}