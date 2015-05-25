namespace RussianDiplom.WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class ThemeContainer
    {
        public Guid Id { get; set; }
        public String Synonym { get; set; }
        public Int32 ClassNumber { get; set; }
    }
}