using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.About
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AboutUs AboutUs { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var aboutUs = await _context.AboutUs.FindAsync(request.AboutUs.Id);
                if (aboutUs == null) return null;

                aboutUs.Header = request.AboutUs.Header;
                aboutUs.Body = request.AboutUs.Body;
                
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to edit about us");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}