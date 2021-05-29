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

namespace GradePredictor.Pages.Enrolments
{
    [Authorize(Roles = "Admin,BMIS,Subcontractor")]
    public class IndexModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public IndexModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Enrolment> Enrolment { get;set; }

        public async Task OnGetAsync()
        {
            Enrolment = await _context.Enrolment.ToListAsync();
        }
    }
}
