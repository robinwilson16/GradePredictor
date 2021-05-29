using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;
using Microsoft.AspNetCore.Authorization;

namespace GradePredictor.Pages.LecturerClassStats
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class EditModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public EditModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public LecturerClassStat LecturerClassStat { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            LecturerClassStat = await _context.LecturerClassStat.FirstOrDefaultAsync(m => m.LecturerClassStatID == id);

            if (LecturerClassStat == null)
            {
                return NotFound();
            }
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(LecturerClassStat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LecturerClassStatExists(LecturerClassStat.LecturerClassStatID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool LecturerClassStatExists(int id)
        {
            return _context.LecturerClassStat.Any(e => e.LecturerClassStatID == id);
        }
    }
}
