using GradePredictor.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Data
{
    
    public class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context,
                          UserManager<ApplicationUser> userManager,
                          RoleManager<ApplicationRole> roleManager,
                          IConfiguration configuration
        )
        {
            context.Database.EnsureCreated();

            // Look for any roles.
            if (context.ApplicationRole.Any())
            {
                return;   // DB has been seeded
            }

            string role1 = "Admin";
            string desc1 = "This is the administrator role";

            string role2 = "BMIS";
            string desc2 = "This is for people logging on using Windows Authentication";

            string role3 = "WebApp";
            string desc3 = "This is for users logging on using local accounts";

            string role4 = "Subcontractor";
            string desc4 = "This is for subcontractors logging in";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role1, desc1, DateTime.Now));
            }
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role2, desc2, DateTime.Now));
            }
            if (await roleManager.FindByNameAsync(role3) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role3, desc3, DateTime.Now));
            }
            if (await roleManager.FindByNameAsync(role4) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role4, desc4, DateTime.Now));
            }

            await context.SaveChangesAsync();
        }
    }
}
