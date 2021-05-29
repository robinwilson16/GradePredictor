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

namespace GradePredictor.Pages.Students
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Student> Student { get;set; }

        public async Task OnGetAsync(string academicYear, string courseCode, string groupCode, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //Student = await _context.Student.ToListAsync();
            if (dataMode == "STATIC")
            {
                Student = await _context.Student
                    .FromSqlInterpolated($"EXEC SPR_GPR_StudentList_Static @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                    .ToListAsync();
            }
            else
            {
                Student = await _context.Student
                    .FromSqlInterpolated($"EXEC SPR_GPR_StudentList @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                    .ToListAsync();
            }
        }

        public async Task<JsonResult> OnGetJsonAsync(string academicYear, string courseCode, string groupCode, string dataMode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            if (dataMode == "STATIC")
            {
                Student = await _context.Student
                    .FromSqlInterpolated($"EXEC SPR_GPR_StudentList_Static @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                    .ToListAsync();
            }
            else
            {
                Student = await _context.Student
                    .FromSqlInterpolated($"EXEC SPR_GPR_StudentList @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                    .ToListAsync();
            }

            return new JsonResult(Student);
        }
    }
}
