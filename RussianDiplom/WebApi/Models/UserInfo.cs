using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RussianDiplom.WebApi.Models
{
    public class UserInfo
    {
        public Guid Id { get; set; }
        public Guid FkUser { get; set; }
        public Int32 Money { get; set; }
        public String Info { get; set; }
        public Boolean Deleted { get; set; }    
    }
}