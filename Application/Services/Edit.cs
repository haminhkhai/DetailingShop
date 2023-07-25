using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Services
{
    public class Edit
    {
        public class Command : IRequest<Result<Service>>
        {
            public IFormFile File { get; set; }
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string VehicleType { get; set; }
            public string Description { get; set; }
            public float Price { get; set; }
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
                var service = await _context.Services.FindAsync(request.Id);
                if (service == null) return null;

                if (request.File != null)
                {
                    if (!string.IsNullOrEmpty(service.ImageId))
                    {
                        //delete old photo
                        var remove = await _photoAccessor.DeletePhoto(service.ImageId);
                    }
                    var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                    service.ImageId = photoUploadResult.PublicId;
                    service.Image = photoUploadResult.Url;
                }

                service.VehicleType = request.VehicleType;
                service.Name = request.Name;
                service.Description = request.Description;
                service.Price = request.Price;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Service>.Success(service);
                return Result<Service>.Failure("Problem edit service");
            }
        }
    }
}