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

namespace GradePredictor.Pages.Courses
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Course> Course { get;set; }

        public async Task OnGetAsync(string academicYear, string username, string coursesITeach, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //Course = await _context.Course.ToListAsync();
            if (dataMode == "STATIC")
            {
                Course = await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList_Static @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}")
                    .ToListAsync();
            }
            else
            {
                Course = await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}")
                    .ToListAsync();
            }
        }

        public async Task<JsonResult> OnGetJsonAsync(string academicYear, string username, string coursesITeach, string collegeGroup, string fac, string team, string courseSearch, string staffSearch, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            if (dataMode == "STATIC")
            {
                Course = await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList_Static @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}")
                    .ToListAsync();
            }
            else
            {
                Course = await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={coursesITeach}, @CourseCode={null}, @GroupCode={null}, @CollegeGroup={collegeGroup}, @Fac={fac}, @Team={team}, @CourseSearch={courseSearch}, @StaffSearch={staffSearch}")
                    .ToListAsync();
            }

            return new JsonResult(Course);
        }
    }
}
