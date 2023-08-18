using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Domain;

namespace Application.Reviews
{
    public class ReviewDto
    {
        public int Rating { get; set; }
        public string Name { get; set; }
        public string Experience { get; set; }
        public List<PhotoDto> Photos { get; set; }
        public string CaptchaToken { get; set; }
    }
}