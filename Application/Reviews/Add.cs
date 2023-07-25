using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Reviews
{
    public class Add
    {
        public class Command : IRequest<Result<Review>>
        {
            public IFormFile[] File { get; set; }
            public string Rating { get; set; }
            public string Name { get; set; }
            public string Experience { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Review>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Review>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = new Review
                {
                    Rating = int.Parse(request.Rating),
                    Name = request.Name,
                    Experience = request.Experience,
                    Date = DateTime.UtcNow,
                    Photos = new List<Photo>()
                };

                if (request.File != null)
                {
                    foreach (var file in request.File)
                    {
                        var photoUploadResult = await _photoAccessor.AddPhoto(file);
                        review.Photos.Add(new Photo
                        {
                            Id = photoUploadResult.PublicId,
                            Url = photoUploadResult.Url
                        });
                    }
                }

                _context.Reviews.Add(review);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Review>.Success(review);
                return Result<Review>.Failure("Problem adding review");
            }
        }
    }
}