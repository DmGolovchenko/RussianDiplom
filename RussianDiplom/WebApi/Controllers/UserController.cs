

using AutoMapper;
using RussianDiplom.WebApi.Models;

namespace RussianDiplom.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Security;
    using System.Security.Cryptography.X509Certificates;
using DAL;


    public class UserController : ApiController
    {
        private readonly RussianEntities _entities;

        public UserController()
        {
            _entities = new RussianEntities(); 
            _entities.Configuration.UseDatabaseNullSemantics = true;
        }

        [AllowAnonymous]
        [Route("api/user/getUserInfo")]
        [HttpGet]
        public UserInfo GetUserInfo()
        {
            var user = Membership.GetUser("dimka1");
            UserInfo userInfo = new UserInfo();
            Int32 money = 0;
            if (user != null)
            {
                Guid userId = new Guid(user.ProviderUserKey.ToString());
                var info = _entities.tUserInfo.FirstOrDefault(inf => !inf.deleted && inf.fkUser == userId);
                if (info != null)
                {
                    userInfo = Mapper.Map<UserInfo>(info);   
                }
            }
            return userInfo;
        }   
    
    }
}
