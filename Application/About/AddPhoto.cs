using Application.Core;
using Application.Interfaces;
using Application.Photos;
using MediatR;
using Persistence;

namespace Application.About
{
    public class AddPhoto
    {
        public class Comamnd : IRequest<Result<Unit>>
        {
            public PhotoDto Photo { get; set; }
        }

        public class Handler : IRequestHandler<Comamnd, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Comamnd request, CancellationToken cancellationToken)
            {
                var aboutUs = await _context.AboutUs.FindAsync(1);
                if (aboutUs == null) return null;

                if (!String.IsNullOrEmpty(aboutUs.ImageId)) await _photoAccessor.DeletePhoto(aboutUs.ImageId);

                aboutUs.ImageId = request.Photo.Public_Id;
                aboutUs.Image = request.Photo.Url;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem uploading photo");
            }
        }
    }
}