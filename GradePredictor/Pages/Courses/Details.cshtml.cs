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
using Microsoft.AspNetCore.Authorization;

namespace GradePredictor.Pages.Courses
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class DetailsModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public DetailsModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public Course Course { get; set; }

        public string CourseGroupCode { get; set; }
        public string DataModeID { get; set; }
        public string AcademicYearID { get; set; }
        public string DefaultAcademicYearID { get; set; }
        public FolderPath FolderPath { get; set; }
        public string Path { get; set; }
        public IList<SelectListData> YesNoData { get; set; }
        public IList<SelectListData> PredictedToAchieveByData { get; set; }
        public IList<SelectListData> PredictedGradeData { get; set; }
        

        public async Task<IActionResult> OnGetAsync(string academicYear, string courseCode, string groupCode, string dataMode)
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

            if (dataMode == "STATIC")
            {
                Course = (await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList_Static @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={null}, @CourseCode={courseCode}, @GroupCode={groupCode}, @CollegeGroup={null}, @Fac={null}, @Team={null}, @CourseSearch={null}, @StaffSearch={null}")
                    .ToListAsync())
                    .FirstOrDefault();
            }
            else
            {
                Course = (await _context.Course
                    .FromSqlInterpolated($"EXEC SPR_GPR_CourseList @AcademicYear={academicYearID}, @Username={username}, @CoursesITeach={null}, @CourseCode={courseCode}, @GroupCode={groupCode}, @CollegeGroup={null}, @Fac={null}, @Team={null}, @CourseSearch={null}, @StaffSearch={null}")
                    .ToListAsync())
                    .FirstOrDefault();
            }

            if (Course == null)
            {
                return NotFound();
            }

            FolderPath = (await _context.FolderPath
                .FromSqlInterpolated($"EXEC SPR_GPR_FolderPath @AcademicYear={academicYearID}, @CollegeGroup={Course.CollegeCode}, @Fac={Course.FacCode}, @Team={Course.TeamCode}, @Course={Course.CourseCode}")
                .ToListAsync())
                .FirstOrDefault();

            if (FolderPath != null)
            {
                Path = FolderPath.Path;

                Path = Path.Replace("[FOLDER]", "<i class=\"fas fa-folder-open\"></i>");
                Path = Path.Replace("[DIVIDER]", "<i class=\"fas fa-chevron-right\"></i>");
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

            if (dataMode == null)
            {
                dataMode = "STATIC";
            }
            DataModeID = dataMode;

            if (Course.GroupCode != null)
            {
                CourseGroupCode += "-" + Course.GroupCode;
            }

            return Page();
        }
    }
}
