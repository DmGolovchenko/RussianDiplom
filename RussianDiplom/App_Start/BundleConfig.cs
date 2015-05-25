namespace RussianDiplom
{
    using System.Web.Optimization;

    public class BundleConfig
    {       
        public static void RegisterBundles(BundleCollection bundles)
        {            
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular/angular.js",
                        "~/Scripts/angular/angular-route.js",
                        "~/Scripts/angular/angular-resource.js",
                        "~/Script/common/web_services.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularMaterial").Include(
                       "~/Scripts/angular/angular-animate.js",
                       "~/Scripts/angular/angular-aria.js",
                       "~/Scripts/angular-material.js"));

            bundles.Add(new ScriptBundle("~/bundles/adminManager").Include(
                       "~/Script/admin/home.js",
                       "~/Script/admin/manageUser.js",
                       "~/Script/admin/manageClass.js",
                       "~/Script/admin/manageTheme.js",
                       "~/Script/admin/manageTest.js"));

            bundles.Add(new ScriptBundle("~/bundles/adminHomeScript").Include(
                      "~/bundles/angular",
                      "~/bundles/angularMaterial",
                      "~/bundles/adminManager"));

            bundles.Add(new StyleBundle("~/bundles/adminStyles").Include(
                      "~/Styles/bootstrap/bootstrap.css",
                      "~/Styles/angular-material/angular-material.css",
                      "~/Styles/admin/adminHome.css"));                    


        }
    }
}
