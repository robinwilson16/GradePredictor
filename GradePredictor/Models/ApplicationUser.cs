using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

        public string Forename { get; set; }
        public string Surname { get; set; }
    }
}
