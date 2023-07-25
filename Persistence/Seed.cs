using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Users.Any())
            {
                var admin = new User() { Password = "Pa$$w0rd", Username = "admin" };
                var aboutUs = new AboutUs()
                {
                    Header = "We Help Companies and Companions",
                    Body = "We can give your company superpowers to do things that they never thought possible." +
                    " Let us delight your customers and empower your needs... through pure data analytics.",
                    Image = ""
                };

                await context.Users.AddAsync(admin);
                await context.AboutUs.AddAsync(aboutUs);
                await context.SaveChangesAsync();
            }
        }
    }
}