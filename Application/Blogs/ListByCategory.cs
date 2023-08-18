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
    public class ListByCategory
    {
        public class Query : IRequest<Result<List<Blog>>>
        {
            public string CategoryName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<Blog>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Blog>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogs = await _context.Blogs
                    .Include(c => c.Category)
                    .Where(b => b.Category.Name == request.CategoryName)
                    .ToListAsync();
                return Result<List<Blog>>.Success(blogs);
            }
        }
    }
}