using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class CollegeStructure
    {
        [Display(Name = "College Structure ID")]
        public int CollegeStructureID { get; set; }

        [Display(Name = "College Structure Code")]
        [StringLength(12)]
        public string CollegeStructureCode { get; set; }

        [Display(Name = "College Structure Name")]
        [StringLength(150)]
        public string CollegeStructureName { get; set; }

        [Display(Name = "College Structure Level")]
        public int CollegeStructureLevel { get; set; }

        [Display(Name = "College Code")]
        [StringLength(12)]
        public string CollegeCode { get; set; }

        [Display(Name = "College Name")]
        [StringLength(150)]
        public string CollegeName { get; set; }

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

        [Display(Name = "Courses")]
        public int Courses { get; set; }

        [Display(Name = "Groups")]
        public int Groups { get; set; }

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
