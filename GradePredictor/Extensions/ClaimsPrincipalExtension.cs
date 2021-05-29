using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GradePredictor.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUsername(this ClaimsPrincipal principal)
        {
            var username = principal.Identity.Name;
            return username;
        }

        public static string GetForename(this ClaimsPrincipal principal)
        {
            var forename = principal.Claims.FirstOrDefault(c => c.Type == "Forename");
            return forename?.Value;
        }

        public static string GetSurname(this ClaimsPrincipal principal)
        {
            var surname = principal.Claims.FirstOrDefault(c => c.Type == "Surname");
            return surname?.Value;
        }

        public static string GetFullName(this ClaimsPrincipal principal)
        {
            string userName = null;
            var forename = principal.Claims.FirstOrDefault(c => c.Type == "Forename");
            var surname = principal.Claims.FirstOrDefault(c => c.Type == "Surname");

            if (forename != null && surname != null)
            {
                userName = forename?.Value + " " + surname?.Value;
            }
            else if (forename != null)
            {
                userName = forename?.Value;
            }
            else if (surname != null)
            {
                userName = surname?.Value;
            }
            else
            {
                userName = principal.Identity.Name;
            }

            return userName;
        }
    }
}
