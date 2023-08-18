using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Blog
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Category Category { get; set; }
        public string Content { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }

    }
}