using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class Course
    {
        [Display(Name = "Course ID")]
        public string CourseID { get; set; }

        [Display(Name = "College Code")]
        [StringLength(12)]
        public string CollegeCode { get; set; }

        [Display(Name = "College Name")]
        [StringLength(150)]
        public string CollegeName { get; set; }

        [Display(Name = "Site Code")]
        [StringLength(20)]
        public string SiteCode { get; set; }

        [Display(Name = "Site Name")]
        [StringLength(100)]
        public string SiteName { get; set; }

        [Display(Name = "Faculty Code")]
        [StringLength(12)]
        public string FacCode { get; set; }

        [Display(Name = "Faculty Name")]
        [StringLength(150)]
        public string FacName { get; set; }

        [Display(Name = "Team Code")]
        [StringLength(12)]
        public string TeamCode { get; set; }

        [Display(Name = "Team Name")]
        [StringLength(150)]
        public string TeamName { get; set; }

        [Display(Name = "Course Code")]
        [StringLength(24)]
        public string CourseCode { get; set; }

        [Display(Name = "Course Title")]
        [StringLength(255)]
        public string CourseTitle { get; set; }

        [Display(Name = "Course Title")]
        [StringLength(255)]
        public string CourseTitleShort { get; set; }

        [Display(Name = "Group")]
        [StringLength(3)]
        public string GroupCode { get; set; }

        [Display(Name = "Start Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EndDate { get; set; }

        [Display(Name = "Aim Code")]
        [StringLength(8)]
        public string AimCode { get; set; }

        [Display(Name = "Aim Title")]
        [StringLength(150)]
        public string AimTitle { get; set; }

        [Display(Name = "Aim Type Code")]
        [StringLength(50)]
        public string AimTypeCode { get; set; }

        [Display(Name = "Aim Type Name")]
        [StringLength(150)]
        public string AimTypeName { get; set; }

        [Display(Name = "Staff Ref")]
        [StringLength(50)]
        public string MainLecturerCode { get; set; }

        [Display(Name = "Staff Surname")]
        [StringLength(50)]
        public string MainLecturerSurname { get; set; }

        [Display(Name = "Staff Forename")]
        [StringLength(50)]
        public string MainLecturerForename { get; set; }

        [Display(Name = "Attend Possible")]
        public int AttendPossible { get; set; }

        [Display(Name = "Attend Present")]
        public int AttendPresent { get; set; }

        [Display(Name = "Attendance")]
        [DisplayFormat(DataFormatString = "{0:P1}")]
        public double AttendPer { get; set; }

        [Display(Name = "Attend Rate")]
        [StringLength(50)]
        public string AttendRate { get; set; }

        [Display(Name = "Continuing Enrolments")]
        public int ContEnrols { get; set; }

        [Display(Name = "Predicted Grade Lookup Type")]
        [StringLength(50)]
        public string PredictedGradeLookupType { get; set; }

        [Display(Name = "Predictions Completed")]
        public int PredictionsCompletedNum { get; set; }

        [Display(Name = "Predictions Completed")]
        [DisplayFormat(DataFormatString = "{0:P1}")]
        public double PredictionsCompletedPer { get; set; }

        [Display(Name = "Predicted to Achieve")]
        public int PredictedToAchieveNum { get; set; }

        [Display(Name = "Predicted to Achieve")]
        [DisplayFormat(DataFormatString = "{0:P1}")]
        public double PredictedToAchievePer { get; set; }

        [Display(Name = "Predicted High")]
        [DisplayFormat(DataFormatString = "{0:P1}")]
        public int PredictedToAchieveHighNum { get; set; }

        [Display(Name = "Predicted High")]
        [DisplayFormat(DataFormatString = "{0:P1}")]
        public double PredictedToAchieveHighPer { get; set; }
    }
}
