namespace RussianDiplom.WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ClassContainer
    {
        public Guid Id { get; set; }
        public Int32 NumberOfClass { get; set; }
        public Int32 CountOfPeople { get; set; }
    }
}