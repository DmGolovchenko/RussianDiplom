﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RussianDiplom.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
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
    }
}
