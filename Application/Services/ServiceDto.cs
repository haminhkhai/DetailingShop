using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AddOns;

namespace Application.Services
{
    public class ServiceDto
    {
        public Guid Id { get; set; }
        public string VehicleType { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }
        public ICollection<AddOnDto> AddOns { get; set; }
    }
}