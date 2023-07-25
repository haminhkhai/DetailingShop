using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Reviews
{
    public class ReviewDto
    {
        public int Rating { get; set; }
        public string Name { get; set; }
        public string Experience { get; set; }
        public List<Photo> Photos { get; set; }
    }
}