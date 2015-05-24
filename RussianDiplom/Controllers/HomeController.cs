using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RussianDiplom.Controllers
{
    public class HomeController : Controller
    {
        public ViewResult Index()
        {
            return View("Index");
        }

        public ViewResult Login()
        {
            return View("LoginPage");
        }     

        [AllowAnonymous]
        public ActionResult Register(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View("RegisterPage");
        }

        [AllowAnonymous]
        public ActionResult Island(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View("Island");
        }

        [AllowAnonymous]
        public ActionResult AdminHome()
        {            
            return View("AdminHome");
        }

        [AllowAnonymous]
        public ActionResult ManageUser()
        {
            return View("ManageUser");
        }

        [AllowAnonymous]
        public ActionResult ManageClass()
        {
            return View("ManageClass");
        }

        [AllowAnonymous]
        public ActionResult ManageTheme()
        {
            return View("ManageTheme");
        }

        [AllowAnonymous]
        public ActionResult ManageTest()
        {
            return View("ManageTest");
        }
    }
}
