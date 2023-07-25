using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Login
{
    public class Account
    {
        public class Query : IRequest<Result<User>>
        {
            public LoginDto LoginDto { get; set; }
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
                var user = await _context.Users.Where(u => u.Username == request.LoginDto.Username)
                    .Where(u => u.Password == request.LoginDto.Password).SingleOrDefaultAsync();

                if (user == null) return Result<User>.Failure("Invalid username or password");

                return Result<User>.Success(user);
            }
        }
    }
}