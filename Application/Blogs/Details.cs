using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs
{
    public class Details
    {
        public class Query : IRequest<Result<Blog>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Blog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Blog>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blog = await _context.Blogs
                    .Include(c => c.Category)
                    .FirstOrDefaultAsync(b => b.Id == request.Id);
                if (blog == null) return null;

                return Result<Blog>.Success(blog);
            }
        }
    }
}