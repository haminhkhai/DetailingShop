using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AddOns;
using Domain;

namespace Application.Bookings
{
    public class BookingDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public float Total { get; set; }
        public DateTime Date { get; set; }
        public DateTime BookingDate { get; set; }
        public string Message { get; set; }
        public Service Service { get; set; }
        public ICollection<AddOnDto> BookingAddOns { get; set; }
        public string CaptchaToken { get; set; }
    }
}