using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.AddOns
{
    public class AddOnValidator : AbstractValidator<AddOn>
    {
        public AddOnValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Service).NotEmpty();
        }
    }
}