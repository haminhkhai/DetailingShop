using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Carousels
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Carousel Carousel { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var carousel = await _context.Carousels.FindAsync(request.Carousel.Id);

                if (carousel.ImageId != request.Carousel.ImageId)
                {
                    await _photoAccessor.DeletePhoto(carousel.ImageId);
                }

                _mapper.Map(request.Carousel, carousel);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem editting carousel");
            }
        }
    }
}