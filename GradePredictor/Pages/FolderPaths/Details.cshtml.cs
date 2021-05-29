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
    public class DetailsModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DetailsModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public FolderPath FolderPath { get; set; }
        public string Path { get; set; }

        public async Task<IActionResult> OnGetAsync(string academicYear, string collegeGroup, string fac, string team, string course)
        {
            if (academicYear == null)
            {
                return NotFound();
            }
            string academicYearID = academicYear.Replace("-", "/");

            //FolderPath = await _context.FolderPath.FirstOrDefaultAsync(m => m.FolderPathID == id);

            FolderPath = (await _context.FolderPath
                .FromSqlInterpolated($"EXEC SPR_GPR_FolderPath @AcademicYear={academicYearID}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @Course={course}")
                .ToListAsync())
                .FirstOrDefault();

            if (FolderPath == null)
            {
                return NotFound();
            }

            Path = FolderPath.Path;

            Path = Path.Replace("[FOLDER]", "<i class=\"fas fa-folder-open\"></i>");
            Path = Path.Replace("[DIVIDER]", "<i class=\"fas fa-chevron-right\"></i>");


            return Page();
        }
    }
}
