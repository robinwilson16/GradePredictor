﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using GradePredictor.Data;
using GradePredictor.Models;

namespace GradePredictor.Pages.Enrolments
{
    public class CreateModel : PageModel
    {
        private readonly GradePredictor.Data.ApplicationDbContext _context;

        public CreateModel(GradePredictor.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Enrolment Enrolment { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Enrolment.Add(Enrolment);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}