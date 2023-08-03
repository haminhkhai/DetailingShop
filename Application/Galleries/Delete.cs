using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Galleries
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gallery = await _context.Galleries
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(g => g.Id == request.Id);
                if (gallery == null) return null;

                foreach (var photo in gallery.Photos)
                {
                    var result = await _photoAccessor.DeletePhoto(photo.Id);
                    if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");
                }

                _context.Galleries.Remove(gallery);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem deleting gallery");
            }
        }
    }
}