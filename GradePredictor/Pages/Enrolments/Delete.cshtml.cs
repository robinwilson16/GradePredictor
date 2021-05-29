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
    public class DeleteModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DeleteModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Enrolment = await _context.Enrolment.FindAsync(id);

            if (Enrolment != null)
            {
                _context.Enrolment.Remove(Enrolment);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
