//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class tClassNumber
    {
        public tClassNumber()
        {
            this.aspnet_Users = new HashSet<aspnet_Users>();
            this.tQuestion = new HashSet<tQuestion>();
            this.tTheme = new HashSet<tTheme>();
        }
    
        public System.Guid pk { get; set; }
        public int numberOfClass { get; set; }
        public bool deleted { get; set; }
    
        public virtual ICollection<aspnet_Users> aspnet_Users { get; set; }
        public virtual ICollection<tQuestion> tQuestion { get; set; }
        public virtual ICollection<tTheme> tTheme { get; set; }
    }
}