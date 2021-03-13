using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class Student
    {
		[Display(Name = "Student Detail ID")]
		public int StudentDetailID { get; set; }

		[Display(Name = "Student Ref")]
		[StringLength(12)]
		public string StudentRef { get; set; }

		[Display(Name = "Surname")]
		[StringLength(40)]
		public string Surname { get; set; }

		[Display(Name = "Forename")]
		[StringLength(50)]
		public string Forename { get; set; }

		public int EnrolmentID { get; set; }

		[Display(Name = "Course Code")]
		[StringLength(24)]
		public string CourseCode { get; set; }

		[Display(Name = "Group")]
		[StringLength(3)]
		public string GroupCode { get; set; }

		[Display(Name = "Completion Status")]
		[StringLength(1)]
		public string CompletionStatusCode { get; set; }

		[Display(Name = "Completion Status")]
		[StringLength(50)]
		public string CompletionStatusName { get; set; }

		[Display(Name = "Attend Possible")]
		public int AttendPossible { get; set; }

		[Display(Name = "Attend Present")]
		public int AttendPresent { get; set; }

		[Display(Name = "Attend %")]
		public double AttendPer { get; set; }

		[Display(Name = "Attend Rate")]
		[StringLength(50)]
		public string AttendRate { get; set; }

		[Display(Name = "Start Date")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? StartDate { get; set; }

		[Display(Name = "Exp End Date")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? ExpEndDate { get; set; }

		[Display(Name = "Predicted to Achieve")]
		public bool? PredictedToAchieve { get; set; }

		[Display(Name = "Predicted to Achieve By")]
		public int? PredictedToAchieveBy { get; set; }

		[Display(Name = "Predicted Grade")]
		[StringLength(255)]
		public string PredictedGrade { get; set; }

		[Display(Name = "Comment")]
		[StringLength(255)]
		public string Comment { get; set; }

		[Display(Name = "Comment (Summary)")]
		[StringLength(255)]
		public string CommentSummary { get; set; }

		[Display(Name = "Created By")]
		[StringLength(255)]
		public string CreatedBy { get; set; }

		[Display(Name = "Created Date")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? CreatedDate { get; set; }
	}
}
