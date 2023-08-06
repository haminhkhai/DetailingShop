using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AddOns;
using Application.Bookings;
using Application.Photos;
using Application.Reviews;
using Application.Services;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Service, Service>();
            CreateMap<Service, ServiceDto>();
            CreateMap<ServiceDto, Service>();

            CreateMap<AddOn, AddOn>();
            CreateMap<AddOn, AddOnDto>()
                .ForMember(b => b.ServiceId, m => m.MapFrom(a => a.Service.Id))
                .ForMember(b => b.ServiceName, m => m.MapFrom(a => a.Service.Name))
                .ForMember(b => b.VehicleType, m => m.MapFrom(a => a.Service.VehicleType));

            CreateMap<BookingDto, Booking>()
                .ForMember(b => b.BookingAddOns, opt => opt.Ignore())
                .ForMember(b => b.Id, opt => opt.Ignore());

            CreateMap<Booking, BookingDto>();

            CreateMap<BookingAddOn, AddOnDto>()
                .ForMember(b => b.Id, m => m.MapFrom(a => a.AddOnId))
                .ForMember(b => b.Name, m => m.MapFrom(a => a.AddOn.Name))
                .ForMember(b => b.Price, m => m.MapFrom(a => a.AddOn.Price))
                .ForMember(b => b.Description, m => m.MapFrom(a => a.AddOn.Description))
                .ForMember(b => b.ServiceId, m => m.MapFrom(a => a.AddOn.Service.Id))
                .ForMember(b => b.ServiceName, m => m.MapFrom(a => a.AddOn.Service.Name))
                .ForMember(b => b.VehicleType, m => m.MapFrom(a => a.AddOn.Service.VehicleType));

            CreateMap<Gallery, Gallery>();

            CreateMap<Carousel, Carousel>();

            CreateMap<PhotoDto, Photo>()
                .ForMember(b => b.Id, m => m.MapFrom(a => a.Public_Id));
            CreateMap<ReviewDto, Review>();
        }
    }
}