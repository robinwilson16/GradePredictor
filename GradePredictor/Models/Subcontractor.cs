using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class Subcontractor
    {
        [Display(Name = "Subcontractor UKPRN")]
        [StringLength(8)]
        public string SubcontractorID { get; set; }

        [Display(Name = "Name")]
        [StringLength(100)]
        public string Name { get; set; }

        [Display(Name = "Email")]
        [StringLength(100)]
        public string Email { get; set; }

        [Display(Name = "Password")]
        [StringLength(255)]
        public string Password { get; set; }
    }
}
