using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;
using Microsoft.AspNetCore.Authorization;

namespace GradePredictor.Pages.Enrolments
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class DetailsModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DetailsModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public Enrolment Enrolment { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Enrolment = await _context.Enrolment.FirstOrDefaultAsync(m => m.EnrolmentID == id);

            if (Enrolment == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
