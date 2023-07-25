using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.AddOns
{
    public class AddOnDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Guid? ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string VehicleType { get; set; }
    }
}