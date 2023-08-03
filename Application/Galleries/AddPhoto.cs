using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Galleries
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Gallery>>
        {
            public PhotoDto Photo { get; set; }
            public Guid GalleryId { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Gallery>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Gallery>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gallery = await _context.Galleries
                    .Include(g => g.Photos)
                    .FirstOrDefaultAsync(g => g.Id == request.GalleryId);

                if (gallery == null) return null;
                if (gallery.Photos == null) gallery.Photos = new List<Photo>();

                var photo = new Photo
                {
                    Id = request.Photo.Public_Id,
                    Url = request.Photo.Url
                };
                gallery.Photos.Add(photo);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Gallery>.Success(gallery);
                return Result<Gallery>.Failure("Problem adding photo");
            }
        }
    }
}