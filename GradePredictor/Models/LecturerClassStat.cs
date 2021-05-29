using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GradePredictor.Models
{
    public class LecturerClassStat
    {
        public int LecturerClassStatID { get; set; }
        public int Courses { get; set; }
        public int Groups { get; set; }
        public int Classes { get; set; }
    }
}
