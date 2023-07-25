using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class AddOn
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }   
        public string Description { get; set; }
        public Service Service { get; set; }
        public ICollection<BookingAddOn> BookingAddOns { get; set; }
    }
}