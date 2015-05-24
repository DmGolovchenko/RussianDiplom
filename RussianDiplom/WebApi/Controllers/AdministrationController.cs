using System.Web.UI.WebControls;
using RussianDiplom.WebApi.Models;

namespace RussianDiplom.WebApi.Controllers
{
    using DAL;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Security;

    public class AdministrationController : ApiController
    {
        private readonly RussianEntities _entities;

        public AdministrationController()
        {
            _entities = new RussianEntities(); 
            _entities.Configuration.UseDatabaseNullSemantics = true;
        }

        [Route("api/admin/getClasses")]
        [HttpGet]
        public IEnumerable<ClassContainer> GetClasses()
        {
            var classes = _entities.tClassNumber.Where(cn => !cn.deleted).Select(cn => new ClassContainer
            {
                Id = cn.pk,
                NumberOfClass = cn.numberOfClass,
                CountOfPeople = _entities.aspnet_Users.Count(us => us.fkClassNumber == cn.pk)
            });
            return classes;        
        }

        [Route("api/admin/addClass")]
        [HttpGet]
        public void AddClass(Int32 classNumber)
        {
            var checkClass = _entities.tClassNumber.FirstOrDefault(
                cn => cn.numberOfClass == classNumber && !cn.deleted);

            if (checkClass != null)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("Такой класс уже существует"))
                };
                throw new HttpResponseException(resp);
            }
            
            tClassNumber newClass = new tClassNumber {numberOfClass = classNumber};
            _entities.tClassNumber.Add(newClass);

            try
            {               
                _entities.SaveChanges();
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("Ошибка при сохранении данных"))
                };
                throw new HttpResponseException(resp);
            }          
        }

        [Route("api/admin/removeClass")]
        [HttpGet]
        public void RemoveClass(Guid id)
        {
            var oldClass = _entities.tClassNumber.FirstOrDefault(
                cn => cn.pk == id && !cn.deleted);

            if (oldClass != null)
            {
                oldClass.deleted = true;
                try
                {
                    _entities.SaveChanges();
                }
                catch (Exception ex)
                {
                    var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                    {
                        Content = new StringContent(string.Format("Ошибка при сохранении данных"))
                    };
                    throw new HttpResponseException(resp);
                }
            }
        }                       

    }
}
