namespace RussianDiplom
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {       
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/Styles/css").Include(
                      "~/Styles/bootstrap/bootstrap.css",
                      "~/Content/site.css"));                    
        }
    }
}
