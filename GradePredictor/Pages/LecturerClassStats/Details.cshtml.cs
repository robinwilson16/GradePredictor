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

namespace GradePredictor.Pages.LecturerClassStats
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class DetailsModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DetailsModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public LecturerClassStat LecturerClassStat { get; set; }

        public async Task<IActionResult> OnGetAsync(string academicYear, string username)
        {
            if (academicYear == null || username == null)
            {
                return NotFound();
            }

            //LecturerClassStat = await _context.LecturerClassStat.FirstOrDefaultAsync(m => m.LecturerClassStatID == id);

            string academicYearID = academicYear.Replace("-", "/");
            LecturerClassStat = (await _context.LecturerClassStat
                .FromSqlInterpolated($"EXEC SPR_GPR_LecturerClassStats @AcademicYear={academicYearID}, @Username={username}")
                .ToListAsync())
                .FirstOrDefault();

            if (LecturerClassStat == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnGetJsonAsync(string academicYear, string username)
        {
            if (academicYear == null || username == null)
            {
                return NotFound();
            }

            //LecturerClassStat = await _context.LecturerClassStat.FirstOrDefaultAsync(m => m.LecturerClassStatID == id);

            string academicYearID = academicYear.Replace("-", "/");
            LecturerClassStat = (await _context.LecturerClassStat
                .FromSqlInterpolated($"EXEC SPR_GPR_LecturerClassStats @AcademicYear={academicYearID}, @Username={username}")
                .ToListAsync())
                .FirstOrDefault();

            //if (LecturerClassStat == null)
            //{
            //    return NotFound();
            //}
            return new JsonResult(LecturerClassStat);
        }
    }
}
