using GradePredictor.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace GradePredictor.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration _configuration)
            : base(options)
        {
            configuration = _configuration;
        }

        public IConfiguration configuration { get; }
        public DbSet<CollegeStructure> CollegeStructure { get; set; }
        public DbSet<Config> Config { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Enrolment> Enrolment { get; set; }
        public DbSet<SelectListData> SelectListData { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public DbSet<StaffMember> StaffMember { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<SubmitResult> SubmitResult { get; set; }

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
            modelBuilder.Entity<StaffMember>(entity => {
                entity.ToView("StaffMember", "dbo");
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
