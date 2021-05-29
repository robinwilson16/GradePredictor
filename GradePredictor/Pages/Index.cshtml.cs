using GradePredictor.Models;
using GradePredictor.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GradePredictor.Extensions;

namespace GradePredictor.Pages
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly Data.ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public IndexModel(ILogger<IndexModel> logger, Data.ApplicationDbContext context, IConfiguration configuration)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;
        }

        public string UserDetails { get; set; }
        public string AcademicYearID { get; set; }
        public string DefaultAcademicYearID { get; set; }
        public int StructureLevelID { get; set; }

        public string CollegeGroupID { get; set; }
        public string FacID { get; set; }
        public string TeamID { get; set; }

        public string AppUserID { get; set; }

        public string DataModeID { get; set; }

        public IList<SelectListData> AcademicYearData { get; set; }

        public IList<Staff> Staff { get; set; }

        public async Task OnGetAsync(string academicYear, string collegeGroup, string fac, string team, string username, string dataMode)
        {
            string academicYearID = null;

            if (academicYear != null)
            {
                academicYearID = academicYear.Replace("-", "/");
            }

            AcademicYearID = await AcademicYearFunctions.GetAcademicYear(academicYearID, _context);
            DefaultAcademicYearID = await AcademicYearFunctions.GetDefaultAcademicYear(_context);

            if(username != null)
            {
                AppUserID = username;
            }
            else
            {
                AppUserID = User.GetUsername();
            }

            if (team != null)
            {
                StructureLevelID = 4;
            }
            else if (fac != null)
            {
                StructureLevelID = 3;
            }
            else if (collegeGroup != null)
            {
                StructureLevelID = 2;
            }
            else
            {
                StructureLevelID = 1;
            }
            CollegeGroupID = collegeGroup;
            FacID = fac;
            TeamID = team;

            if (dataMode == null)
            {
                dataMode = "STATIC";
            }
            DataModeID = dataMode;

            //UserDetails = await Identity.GetFullName(academicYear, User.Identity.Name.Split('\\').Last(), _context);
            UserDetails = await Identity.GetFullName(academicYearID, "r.wilson2", _context);

            string selectListDomain = null;

            selectListDomain = "ACADEMIC_YEAR";
            AcademicYearData = await _context.SelectListData
                .FromSqlInterpolated($"EXEC SPR_GPR_SelectListData @AcademicYear={AcademicYearID}, @Domain={selectListDomain}")
                .ToListAsync();

            ViewData["AcademicYearID"] = new SelectList(AcademicYearData, "Code", "Description", AcademicYearID);

            Staff = await _context.Staff
                .FromSqlInterpolated($"EXEC SPR_GPR_StaffList @AcademicYear={AcademicYearID}")
                .ToListAsync();
        }
    }
}
