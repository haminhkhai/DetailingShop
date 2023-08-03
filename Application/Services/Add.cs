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
            public Service Service { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Service).SetValidator(new ServiceValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Service>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Service>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Services.Add(request.Service);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Service>.Success(request.Service);
                return Result<Service>.Failure("Problem adding service");
            }
        }
    }
}