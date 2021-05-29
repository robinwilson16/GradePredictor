using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using GradePredictor.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System.DirectoryServices.AccountManagement;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using GradePredictor.Data;
using Microsoft.EntityFrameworkCore;

namespace GradePredictor.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly ApplicationDbContext _context;

        public LoginModel(SignInManager<ApplicationUser> signInManager, 
            ILogger<LoginModel> logger,
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _context = context;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public Subcontractor Subcontractor { get; set; }

        public class InputModel
        {
            [Display(Name = "Username")]
            [Required]
            //[EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl ??= Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var appUser = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);

                //Check if user is a subcontractor
                Subcontractor = (await _context.Subcontractor
                    .FromSqlInterpolated($"EXEC SPR_GPR_Subcontractor @SubcontractorID={Input.Email}, @Password={null}")
                    .ToListAsync())
                    .FirstOrDefault();

                if (Subcontractor == null)
                {
                    //return NotFound();
                }

                ContextType contextType = ContextType.Domain;
                //Using a different context to query AD from the app
                PrincipalContext appADContext = new(contextType, "BMIS", "Users", "centimesupport", "pr0supp0rt");
                PrincipalContext userContext = new(contextType, "BMIS", "Users", Input.Email, Input.Password);
                var domainContext = new PrincipalContext(ContextType.Domain);
                var windowsUser = UserPrincipal.FindByIdentity(domainContext, Input.Email);

                string windowsUsername = Input.Email;
                string windowsEmail = null;

                //Remove domain part from username if entered at start - e.g. BMIS\r.wilson
                if (windowsUsername.IndexOf("\\") > 0)
                {
                    windowsUsername = windowsUsername.Split("\\").Last();
                }

                //Remove domain part in entered in email address format - e.g. r.wilson@wlc.ac.uk
                if (windowsUsername.IndexOf("@") > 0)
                {
                    windowsUsername = windowsUsername.Split("@").First();
                    windowsEmail = windowsUsername;
                }

                if (windowsUser != null)
                {
                    //If matching Windows user found
                    if (appADContext.ValidateCredentials(Input.Email, Input.Password) == true)
                    {
                        string email = windowsEmail;
                        string normalizedEmail = null;
                        string userName = windowsUsername;
                        string normalizedUserName = windowsUsername.ToUpper();
                        string forename = null;
                        string surname = null;

                        if (windowsEmail != null)
                        {
                            normalizedEmail = windowsEmail.ToUpper();
                        }

                        using (var context = new PrincipalContext(ContextType.Domain))
                        {
                            var principal = UserPrincipal.FindByIdentity(context, windowsUsername);
                            forename = principal.GivenName;
                            surname = principal.Surname;
                        }

                        ApplicationUser applicationUser = new ApplicationUser
                        {
                            UserName = userName,
                            NormalizedUserName = normalizedUserName,
                            Email = email,
                            NormalizedEmail = normalizedEmail,
                            Forename = forename,
                            Surname = surname
                        };

                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, windowsUsername, Input.Password),
                            new Claim(ClaimTypes.Role, "BMIS"),
                        };

                        if (applicationUser.Forename != null)
                        {
                            claims.Add(new Claim("Forename", applicationUser.Forename));
                        }
                        if (applicationUser.Surname != null)
                        {
                            claims.Add(new Claim("Surname", applicationUser.Surname));
                        }

                        var claimsIdentity = new ClaimsIdentity(
                            claims, CookieAuthenticationDefaults.AuthenticationScheme);

                        var authProperties = new AuthenticationProperties
                        {
                            //AllowRefresh = <bool>,
                            // Refreshing the authentication session should be allowed.

                            //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                            // The time at which the authentication ticket expires. A 
                            // value set here overrides the ExpireTimeSpan option of 
                            // CookieAuthenticationOptions set with AddCookie.

                            IsPersistent = Input.RememberMe
                            // Whether the authentication session is persisted across 
                            // multiple requests. When used with cookies, controls
                            // whether the cookie's lifetime is absolute (matching the
                            // lifetime of the authentication ticket) or session-based.

                            //IssuedUtc = <DateTimeOffset>,
                            // The time at which the authentication ticket was issued.

                            //RedirectUri = <string>
                            // The full path or absolute URI to be used as an http 
                            // redirect response value.
                        };

                        await _signInManager.SignInWithClaimsAsync(applicationUser, authProperties, claims);
                        //await HttpContext.SignInAsync(
                        //CookieAuthenticationDefaults.AuthenticationScheme,
                        //new ClaimsPrincipal(claimsIdentity),
                        //authProperties);

                        _logger.LogInformation("User logged in.");
                        return LocalRedirect(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid Windows User login attempt.");
                        return Page();
                    }
                }
                else if (Subcontractor != null)
                {
                    //If matching subcontractor found
                    Subcontractor = (await _context.Subcontractor
                        .FromSqlInterpolated($"EXEC SPR_GPR_Subcontractor @SubcontractorID={Input.Email}, @Password={Input.Password}")
                        .ToListAsync())
                        .FirstOrDefault();

                    if (Subcontractor != null)
                    {
                        string normalizedEmail = null;
                        if (Subcontractor.Email != null)
                        {
                            normalizedEmail = Subcontractor.Email.ToUpper();
                        }

                        ApplicationUser applicationUser = new ApplicationUser
                        {
                            UserName = Subcontractor.SubcontractorID,
                            NormalizedUserName = Subcontractor.SubcontractorID.ToUpper(),
                            Email = Subcontractor.Email,
                            NormalizedEmail = normalizedEmail,
                            Forename = Subcontractor.Name,
                            Surname = null
                        };

                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, Input.Email, Input.Password),
                            new Claim("Forename", applicationUser.Forename),
                            //new Claim("Surname", applicationUser.Surname),
                            new Claim(ClaimTypes.Role, "Subcontractor"),
                        };

                        var claimsIdentity = new ClaimsIdentity(
                            claims, CookieAuthenticationDefaults.AuthenticationScheme);

                        var authProperties = new AuthenticationProperties
                        {
                            IsPersistent = Input.RememberMe
                        };

                        await _signInManager.SignInWithClaimsAsync(applicationUser, authProperties, claims);
                        //await HttpContext.SignInAsync(
                        //CookieAuthenticationDefaults.AuthenticationScheme,
                        //new ClaimsPrincipal(claimsIdentity),
                        //authProperties);

                        _logger.LogInformation("User logged in.");
                        return LocalRedirect(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid Subcontractor User login attempt.");
                        return Page();
                    }
                }
                else if (appUser != null)
                {
                    //If matching app user found
                    if (appUser.Succeeded)
                    {
                        _logger.LogInformation("User logged in.");
                        return LocalRedirect(returnUrl);
                    }
                    if (appUser.RequiresTwoFactor)
                    {
                        return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
                    }
                    if (appUser.IsLockedOut)
                    {
                        _logger.LogWarning("User account locked out.");
                        return RedirectToPage("./Lockout");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid Application User login attempt.");
                        return Page();
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
