using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GradePredictor.Data;
using GradePredictor.Models;
using Microsoft.AspNetCore.Authorization;

namespace GradePredictor.Pages.Enrolments
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class EditModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public EditModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Enrolment Enrolment { get; set; }
        public SubmitResult SubmitResult { get; set; }

        public async Task<IActionResult> OnGetAsync(string academicYearID, int? enrolmentID)
        {
            if (academicYearID == null || enrolmentID == null)
            {
                return NotFound();
            }

            string academicYear = academicYearID.Replace("-", "/");

            //Enrolment = await _context.Enrolment.FirstOrDefaultAsync(m => m.EnrolmentID == id);
            Enrolment = (await _context.Enrolment
                .FromSqlInterpolated($"EXEC SPR_GPR_Enrolment @AcademicYear={academicYear}, @EnrolmentID={enrolmentID}")
                .ToListAsync())
                .FirstOrDefault();

            if (Enrolment == null)
            {
                return NotFound();
            }
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<JsonResult> OnPostAsync(string academicYearID, int enrolmentID)
        {
            SubmitResult = new SubmitResult
            {
                SubmitResultID = "ENROLMENT"
            };

            string academicYear = academicYearID.Replace("-", "/");

            Enrolment.AcademicYearID = academicYear;
            Enrolment.EnrolmentID = enrolmentID;
            TryValidateModel(Enrolment, nameof(Enrolment));

            //if (!ModelState.IsValid)
            //{
            //    SubmitResult.IsSuccessful = false;
            //    SubmitResult.ErrorLevel = ErrorLevel.Error;
            //    SubmitResult.ErrorCode = "MODEL";
            //    SubmitResult.ErrorDescription = "Data Model Is Invalid";
            //    SubmitResult.StackTrace = ModelState.ToString();
            //    //return Page();
            //    return new JsonResult(SubmitResult);
            //}

            _context.Attach(Enrolment).State = EntityState.Modified;

            try
            {
                //await _context.SaveChangesAsync();
                await _context.Database
                    .ExecuteSqlInterpolatedAsync($"EXEC SPR_GPR_UpdateEnrolment @AcademicYear={Enrolment.AcademicYearID}, @EnrolmentID={Enrolment.EnrolmentID}, @PredictedToAchieve={Enrolment.PredictedToAchieve}, @PredictedToAchieveBy={Enrolment.PredictedToAchieveBy}, @PredictedGrade={Enrolment.PredictedGrade}, @Comment={Enrolment.Comment}, @CreatedBy={User.Identity.Name.Split('\\').Last()}, @CreatedDate={DateTime.Now}");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnrolmentExists(Enrolment.EnrolmentID))
                {
                    //return NotFound();
                    SubmitResult.IsSuccessful = false;
                    SubmitResult.ErrorLevel = ErrorLevel.Error;
                    SubmitResult.ErrorCode = "NOT_FOUND";
                    SubmitResult.ErrorDescription = $"The enrolment {Enrolment.EnrolmentID} could not be found";
                    //return Page();
                    return new JsonResult(SubmitResult);
                }
                else
                {
                    throw;
                }
            }

            //return RedirectToPage("./Index");
            SubmitResult.IsSuccessful = true;
            return new JsonResult(SubmitResult);
        }

        private bool EnrolmentExists(int id)
        {
            return _context.Enrolment.Any(e => e.EnrolmentID == id);
        }
    }
}
