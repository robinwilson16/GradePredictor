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
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<CollegeStructure> CollegeStructure { get;set; }

        public async Task OnGetAsync(string academicYear, string username, string coursesITeach, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, int structureLevel, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //CollegeStructure = await _context.CollegeStructure.ToListAsync();
            if (dataMode == "STATIC")
            {
                CollegeStructure = await _context.CollegeStructure
                    .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList_Static @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                    .ToListAsync();
            }
            else
            {
                CollegeStructure = await _context.CollegeStructure
                    .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                    .ToListAsync();
            }
        }

        public async Task<JsonResult> OnGetJsonAsync(string academicYear, string username, string coursesITeach, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, int structureLevel, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            if (dataMode == "STATIC")
            {
                CollegeStructure = await _context.CollegeStructure
                    .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList_Static @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                    .ToListAsync();
            }
            else
            {
                CollegeStructure = await _context.CollegeStructure
                    .FromSqlInterpolated($"EXEC SPR_GPR_CollegeStructureList @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}, @StructureLevel={structureLevel}")
                    .ToListAsync();
            }

            return new JsonResult(CollegeStructure);
        }
    }
}
