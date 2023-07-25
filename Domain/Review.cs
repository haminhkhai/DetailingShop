using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Review
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public string Name { get; set; }
        public string Experience { get; set; }
        public DateTime Date { get; set; }
        public Boolean IsShowed { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}