using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Services
{
    public class ServiceValidator : AbstractValidator<Service>
    {
        public ServiceValidator()
        {
            RuleFor(s => s.Name).NotEmpty();
            RuleFor(s => s.VehicleType).NotEmpty();
            RuleFor(s => s.Price).NotEmpty().LessThanOrEqualTo(9999);
        }
    }
}