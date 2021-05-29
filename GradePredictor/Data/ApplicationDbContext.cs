using GradePredictor.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace GradePredictor.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration _configuration)
            : base(options)
        {
            configuration = _configuration;
        }

        public IConfiguration configuration { get; }
        public DbSet<ApplicationRole> ApplicationRole { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<CollegeStructure> CollegeStructure { get; set; }
        public DbSet<Config> Config { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Enrolment> Enrolment { get; set; }
        public DbSet<FolderPath> FolderPath { get; set; }
        public DbSet<LecturerClassStat> LecturerClassStat { get; set; }
        public DbSet<SelectListData> SelectListData { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public DbSet<StaffMember> StaffMember { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Subcontractor> Subcontractor { get; set; }
        public DbSet<SubmitResult> SubmitResult { get; set; }
        public DbSet<SystemSettings> SystemSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Needed to add composite key
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Config>()
                .HasKey(c => new { c.AcademicYear });

            modelBuilder.Entity<SelectListData>()
               .HasKey(d => new { d.Code });

            modelBuilder.Entity<Staff>()
                .HasKey(c => new { c.StaffRef });

            modelBuilder.Entity<StaffMember>()
                .HasKey(c => new { c.StaffRef });

            modelBuilder.Entity<Student>()
                .HasKey(c => new { c.StudentDetailID });

            modelBuilder.Entity<SystemSettings>()
                .HasNoKey();

            //Prevent creating table in EF Migration
            modelBuilder.Entity<CollegeStructure>(entity => {
                entity.ToView("CollegeStructure", "dbo");
            });
            modelBuilder.Entity<Config>(entity => {
                entity.ToView("Config", "dbo");
            });
            modelBuilder.Entity<Course>(entity => {
                entity.ToView("Course", "dbo");
            });
            modelBuilder.Entity<Enrolment>(entity => {
                entity.ToView("Enrolment", "dbo");
            });
            modelBuilder.Entity<FolderPath>(entity => {
                entity.ToView("FolderPath", "dbo");
            });
            modelBuilder.Entity<LecturerClassStat>(entity => {
                entity.ToView("LecturerClassStat", "dbo");
            });
            modelBuilder.Entity<SelectListData>(entity => {
                entity.ToView("SelectListData", "dbo");
            });
            modelBuilder.Entity<Staff>(entity => {
                entity.ToView("Staff", "dbo");
            });
            modelBuilder.Entity<StaffMember>(entity => {
                entity.ToView("StaffMember", "dbo");
            });
            modelBuilder.Entity<Student>(entity => {
                entity.ToView("Student", "dbo");
            });
            modelBuilder.Entity<Subcontractor>(entity => {
                entity.ToView("Subcontractor", "dbo");
            });
            modelBuilder.Entity<SubmitResult>(entity => {
                entity.ToView("SubmitResult", "dbo");
            });
            modelBuilder.Entity<SystemSettings>(entity => {
                entity.ToView("SystemSettings", "dbo");
            });
        }

        //Rename migration history table
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                x => x.MigrationsHistoryTable("__GPR_EFMigrationsHistory", "dbo"));

        //Rename migration history table
    }
}
