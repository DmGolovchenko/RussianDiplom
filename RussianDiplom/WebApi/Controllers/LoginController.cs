namespace RussianDiplom.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Security;
    using System.Security.Cryptography.X509Certificates;

    public class LoginController : ApiController
    {
        [AllowAnonymous]
        [Route("api/user/loginUser")]
        [HttpGet]
        public String LoginUser(String username, String password)
        {
            if (username != null && password != null)
            {
                if (Membership.ValidateUser(username, password))
                {
                    var user = Membership.GetUser(username);
                    var userRoles = Roles.GetRolesForUser(username);
                    if (userRoles.Contains("Administrator"))
                    {
                        return "0";
                    }
                    else
                    {
                        return "1";
                    }
                }
                else
                {
                    return "-1";
                }
            }
            else return "-2";
        }       

        [AllowAnonymous]
        [Route("api/user/register")]
        [HttpGet]
        public HttpResponseMessage Register(String username, String password)
        {
            MembershipCreateStatus createStatus;
            Membership.CreateUser(username, password, null, passwordQuestion: null, passwordAnswer: null, isApproved: true, providerUserKey: null, status: out createStatus);                                    

            if (createStatus == MembershipCreateStatus.Success)
            {
                Roles.AddUserToRole(username, "SimpleUser");
                FormsAuthentication.SetAuthCookie(username, false);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }
        }       

    }
}
