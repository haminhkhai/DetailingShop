using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Carousels
{
    public class Add
    {
        public class Command : IRequest<Result<Carousel>>
        {
            public Carousel Carousel { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Carousel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Carousel>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Carousels.Add(request.Carousel);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Carousel>.Success(request.Carousel);
                return Result<Carousel>.Failure("Problem adding carousel");
            }
        }
    }
}