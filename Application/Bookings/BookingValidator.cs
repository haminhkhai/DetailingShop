using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Bookings
{
    public class BookingValidator : AbstractValidator<BookingDto>
    {
        public BookingValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Tel).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.BookingDate).NotEmpty();
            RuleFor(x => x.Service).NotEmpty();
        }
    }
}