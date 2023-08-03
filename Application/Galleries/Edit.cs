using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Galleries
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Gallery Gallery { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gallery = await _context.Galleries.FindAsync(request.Gallery.Id);
                if (gallery == null) return null;

                _mapper.Map(request.Gallery, gallery);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem editting gallery");
            }
        }
    }
}