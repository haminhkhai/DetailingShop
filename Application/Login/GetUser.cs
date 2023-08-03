using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Login
{
    public class GetUser
    {
        public class Query : IRequest<Result<User>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<User>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == request.Username);
                if (user == null) return null;

                return Result<User>.Success(user);
            }
        }
    }
}