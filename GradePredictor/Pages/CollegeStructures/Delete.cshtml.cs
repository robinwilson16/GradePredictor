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

namespace GradePredictor.Pages.CollegeStructures
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
        public CollegeStructure CollegeStructure { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            CollegeStructure = await _context.CollegeStructure.FirstOrDefaultAsync(m => m.CollegeStructureID == id);

            if (CollegeStructure == null)
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

            CollegeStructure = await _context.CollegeStructure.FindAsync(id);

            if (CollegeStructure != null)
            {
                _context.CollegeStructure.Remove(CollegeStructure);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
