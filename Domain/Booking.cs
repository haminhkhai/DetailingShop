using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Booking
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public float Total { get; set; }
        public DateTime Date { get; set; }
        public DateTime BookingDate { get; set; }
        public string Message { get; set; }
        public Service Service { get; set; }
        public ICollection<BookingAddOn> BookingAddOns { get; set; }
    }
}