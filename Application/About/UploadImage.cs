using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Admin.Dtos;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.About
{
    public class UploadImage
    {
        public class Command : IRequest<Result<PhotoDto>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PhotoDto>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<PhotoDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var aboutUs = await _context.AboutUs.FindAsync(1);
                if (aboutUs == null) return null;

                var deleteOldPhoto = await _photoAccessor.DeletePhoto(aboutUs.ImageId);

                // if (!deleteOldPhoto.Equals("ok")) return Result<PhotoDto>.Failure("Problem delete image");

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                var photoDto = new PhotoDto
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };

                aboutUs.Image = photoUploadResult.Url;
                aboutUs.ImageId = photoUploadResult.PublicId;
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<PhotoDto>.Success(photoDto);
                return Result<PhotoDto>.Failure("Problem edit image");
            }
        }
    }
}