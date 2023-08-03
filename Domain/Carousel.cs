using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Carousel
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }
    }
}