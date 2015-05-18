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
            return View("LoginPage");
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
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
    }
}
