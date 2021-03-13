using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;

namespace GradePredictor.Pages.CollegeStructures
{
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<CollegeStructure> CollegeStructure { get;set; }

        public async Task OnGetAsync(string academicYear, string username, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, int structureLevel)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //CollegeStructure = await _context.CollegeStructure.ToListAsync();
            CollegeStructure = await _context.CollegeStructure
                .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList @AcademicYear={academicYearID}, @Username={username}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                .ToListAsync();
        }

        public async Task<JsonResult> OnGetJsonAsync(string academicYear, string username, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, int structureLevel)
        {
            string academicYearID = academicYear.Replace("-", "/");

            CollegeStructure = await _context.CollegeStructure
                .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList @AcademicYear={academicYearID}, @Username={username}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                .ToListAsync();

            return new JsonResult(CollegeStructure);
        }
    }
}
