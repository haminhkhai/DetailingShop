using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.About
{
    public class AboutValidator : AbstractValidator<AboutUs>
    {
        public AboutValidator()
        {
            RuleFor(x => x.Header).NotEmpty();
            RuleFor(x => x.Body).NotEmpty();
        }
    }
}