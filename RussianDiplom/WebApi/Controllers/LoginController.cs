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
        [AllowAnonymous]
        [Route("api/user/loginUser")]
        [HttpGet]
        public Int32 LoginUser(String Username, String Password)
        {
            if (Username != null && Password != null)
            {
                if (Membership.ValidateUser(Username, Password))
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            }
            else return 1;
        }

        [AllowAnonymous]
        [Route("api/user/register")]
        [HttpGet]
        public String Register(String Username, String Password)
        {
            MembershipCreateStatus createStatus;
            Membership.CreateUser(Username, Password, null, passwordQuestion: null, passwordAnswer: null, isApproved: true, providerUserKey: null, status: out createStatus);            

            if (createStatus == MembershipCreateStatus.Success)
            {
                FormsAuthentication.SetAuthCookie(Username, false);
                return createStatus.ToString();
            }
            else
            {
                return createStatus.ToString();
            }
        }

    }
}
