using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;

namespace GradePredictor.Pages.Students
{
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Student> Student { get;set; }

        public async Task OnGetAsync(string academicYear, string courseCode, string groupCode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //Student = await _context.Student.ToListAsync();
            Student = await _context.Student
                .FromSqlInterpolated($"EXEC SPR_GPR_StudentList @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                .ToListAsync();
        }

        public async Task<JsonResult> OnGetJsonAsync(string academicYear, string courseCode, string groupCode)
        {
            string academicYearID = academicYear.Replace("-", "/");

            //Student = await _context.Student.ToListAsync();
            Student = await _context.Student
                .FromSqlInterpolated($"EXEC SPR_GPR_StudentList @AcademicYear={academicYearID}, @CourseCode={courseCode}, @GroupCode={groupCode}")
                .ToListAsync();

            return new JsonResult(Student);
        }
    }
}
