using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Reviews
{
    public class Add
    {
        public class Command : IRequest<Result<Review>>
        {
            public ReviewDto Review { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Review>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Review>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = new Review();
                _mapper.Map(request.Review, review);

                review.Date = DateTime.UtcNow;
                review.IsShowed = false;

                _context.Reviews.Add(review);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Review>.Success(review);
                return Result<Review>.Failure("Problem adding review");
            }
        }
    }
}