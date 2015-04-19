using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace RussianDiplom.Controllers
{
    public class LoginController : ApiController
    {
        [Route("api/user/loginUser")]
        [HttpGet]
        public Boolean LoginUser(String Username, String Password)
        {
            if (Username != null && Password != null)
            {
                if (Membership.ValidateUser(Username, Password))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else return false;
        }   
    }
}
