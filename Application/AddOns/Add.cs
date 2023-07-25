using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.AddOns
{
    public class Add
    {
        public class Command : IRequest<Result<AddOnDto>>
        {
            public AddOn AddOn { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AddOn).SetValidator(new AddOnValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<AddOnDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<AddOnDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var service = await _context.Services.FindAsync(request.AddOn.Service.Id);

                var newAddOn = request.AddOn;
                newAddOn.Service = service;

                _context.AddOns.Add(newAddOn);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<AddOnDto>.Success(_mapper.Map(newAddOn, new AddOnDto()));
                return Result<AddOnDto>.Failure("Problem Adding Add-On");
            }
        }
    }
}