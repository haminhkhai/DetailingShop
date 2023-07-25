using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<AboutUs> AboutUs { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<AddOn> AddOns { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingAddOn> BookingAddOns { get; set; }
        public DbSet<Gallery> Galleries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<BookingAddOn>(b => b.HasKey(bb => new { bb.AddOnId, bb.BookingId }));

            builder.Entity<BookingAddOn>()
                .HasOne(a => a.AddOn)
                .WithMany(b => b.BookingAddOns)
                .HasForeignKey(aa => aa.AddOnId);

            builder.Entity<BookingAddOn>()
                .HasOne(b => b.Booking)
                .WithMany(a => a.BookingAddOns)
                .HasForeignKey(bb => bb.BookingId);
        }
    }
}