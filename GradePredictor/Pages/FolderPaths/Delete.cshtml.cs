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

namespace GradePredictor.Pages.FolderPaths
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
        public FolderPath FolderPath { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            FolderPath = await _context.FolderPath.FirstOrDefaultAsync(m => m.FolderPathID == id);

            if (FolderPath == null)
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

            FolderPath = await _context.FolderPath.FindAsync(id);

            if (FolderPath != null)
            {
                _context.FolderPath.Remove(FolderPath);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
