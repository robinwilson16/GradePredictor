using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class Enrolment
    {
		[Display(Name = "Enrolment ID")]
		public int EnrolmentID { get; set; }

		[Display(Name = "AcademicYear")]
		[StringLength(5)]
		public string AcademicYearID { get; set; }

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

		[Display(Name = "Created By")]
		[StringLength(255)]
		public string CreatedBy { get; set; }

		[Display(Name = "Created Date")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? CreatedDate { get; set; }
	}
}
