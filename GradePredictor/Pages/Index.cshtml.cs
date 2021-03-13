using GradePredictor.Models;
using GradePredictor.Shared;
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

namespace GradePredictor.Pages
{
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

        public IList<SelectListData> AcademicYearData { get; set; }

        public IList<Staff> Staff { get; set; }

        public async Task OnGetAsync(string academicYear)
        {
            AcademicYearID = await AcademicYearFunctions.GetAcademicYear(academicYear, _context);
            DefaultAcademicYearID = await AcademicYearFunctions.GetDefaultAcademicYear(_context);
            UserDetails = await Identity.GetFullName(academicYear, User.Identity.Name.Split('\\').Last(), _context);

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
