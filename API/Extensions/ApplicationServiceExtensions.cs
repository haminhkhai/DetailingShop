using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using Application.Bookings;
using Application.Core;
using Application.Interfaces;
using Application.Login;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photo;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(
                opt =>
                {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                }
            );
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(Account.Handler));
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Add>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            
            return services;
        }
    }
}