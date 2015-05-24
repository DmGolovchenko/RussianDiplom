using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RussianDiplom.WebApi.Models
{
    public class ClassNumber
    {
        public Guid Id { get; set; }
        public Int32 NumberOfClass { get; set; }
        public Boolean Deleted { get; set; }
    }
}