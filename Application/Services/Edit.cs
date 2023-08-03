using Application.Core;
using Application.Interfaces;
using Application.Photos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Services
{
    public class Edit
    {
        public class Command : IRequest<Result<Service>>
        {
            public Service Service { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(s => s.Service).SetValidator(new ServiceValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Service>>
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
            public async Task<Result<Service>> Handle(Command request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FindAsync(request.Service.Id);
                if (service == null) return null;

                if (request.Service.ImageId != service.ImageId)
                {
                    if (!string.IsNullOrEmpty(service.ImageId))
                    {
                        //delete old photo
                        var remove = await _photoAccessor.DeletePhoto(service.ImageId);
                    }
                }

                _mapper.Map(request.Service, service);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Service>.Success(service);
                return Result<Service>.Failure("Problem edit service");
            }
        }
    }
}