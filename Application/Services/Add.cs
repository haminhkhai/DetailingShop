using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Services
{
    public class Add
    {
        public class Command : IRequest<Result<Service>>
        {
            public IFormFile File { get; set; }
            public string VehicleType { get; set; }
            public string Name { get; set; }
            public float Price { get; set; }
            public string Description { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Service>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Result<Service>> Handle(Command request, CancellationToken cancellationToken)
            {
                var service = new Service
                {
                    VehicleType = request.VehicleType,
                    Name = request.Name,
                    Price = request.Price,
                    Description = request.Description
                };

                if (request.File != null)
                {
                    var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                    service.ImageId = photoUploadResult.PublicId;
                    service.Image = photoUploadResult.Url;
                }

                _context.Services.Add(service);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Service>.Success(service);
                return Result<Service>.Failure("Problem adding service");
            }
        }
    }
}