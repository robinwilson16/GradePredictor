using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;
using GradePredictor.Shared;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GradePredictor.Pages.Courses
{
    public class DetailsModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DetailsModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public Course Course { get; set; }

        public string CourseGroupCode { get; set; }
        public string AcademicYearID { get; set; }
        public string DefaultAcademicYearID { get; set; }
        public IList<SelectListData> YesNoData { get; set; }
        public IList<SelectListData> PredictedToAchieveByData { get; set; }
        public IList<SelectListData> PredictedGradeData { get; set; }
        

        public async Task<IActionResult> OnGetAsync(string academicYear, string courseCode, string groupCode)
        {
            if (courseCode == null)
            {
                return NotFound();
            }

            AcademicYearID = academicYear;
            DefaultAcademicYearID = await AcademicYearFunctions.GetDefaultAcademicYear(_context);

            if(AcademicYearID == null)
            {
                AcademicYearID = DefaultAcademicYearID;
            }

            string academicYearID = AcademicYearID.Replace("-", "/");
            string username = User.Identity.Name.Split('\\').Last();

            //Course = await _context.Course.FirstOrDefaultAsync(m => m.CourseID == id);
            Course = (await _context.Course
                .FromSqlInterpolated($"EXEC SPR_GPR_CourseList @AcademicYear={academicYearID}, @Username={username}, @CourseCode={courseCode}, @GroupCode={groupCode}, @CollegeGroup={null}, @Fac={null}, @Team={null}, @CourseSearch={null}, @StaffSearch={null}")
                .ToListAsync())
                .FirstOrDefault();

            if (Course == null)
            {
                return NotFound();
            }

            string selectListDomain = null;

            selectListDomain = "YES_NO";
            YesNoData = await _context.SelectListData
                .FromSqlInterpolated($"EXEC SPR_GPR_SelectListData @AcademicYear={AcademicYearID}, @Domain={selectListDomain}")
                .ToListAsync();
            ViewData["YesNoID"] = new SelectList(YesNoData, "Code", "Description");

            selectListDomain = "PREDICTED_TO_ACHIEVE_BY";
            PredictedToAchieveByData = await _context.SelectListData
                .FromSqlInterpolated($"EXEC SPR_GPR_SelectListData @AcademicYear={AcademicYearID}, @Domain={selectListDomain}")
                .ToListAsync();
            ViewData["PredictedToAchieveByID"] = new SelectList(PredictedToAchieveByData, "Code", "Description");

            selectListDomain = Course.PredictedGradeLookupType;
            PredictedGradeData = await _context.SelectListData
                .FromSqlInterpolated($"EXEC SPR_GPR_SelectListData @AcademicYear={AcademicYearID}, @Domain={selectListDomain}")
                .ToListAsync();
            ViewData["PredictedGradeID"] = new SelectList(PredictedGradeData, "Code", "Description");

            CourseGroupCode = Course.CourseCode;

            if(Course.GroupCode != null)
            {
                CourseGroupCode += "-" + Course.GroupCode;
            }

            return Page();
        }
    }
}
