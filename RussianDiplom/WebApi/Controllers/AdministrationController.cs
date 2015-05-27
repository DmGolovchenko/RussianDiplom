using System.Data.Entity;
using System.Web.Security;
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

    public class AdministrationController : ApiController
    {
        private readonly RussianEntities _entities;

        public AdministrationController()
        {
            _entities = new RussianEntities(); 
            _entities.Configuration.UseDatabaseNullSemantics = true;
        }

        #region Classes
        [Route("api/admin/getClasses")]
        [HttpGet]
        public IEnumerable<ClassContainer> GetClasses()
        {
            var classes = _entities.tClassNumber.Where(cn => !cn.deleted).Select(cn => new ClassContainer
            {
                Id = cn.pk,
                NumberOfClass = cn.numberOfClass,
                CountOfPeople = _entities.aspnet_Users.Count(us => us.fkClassNumber == cn.pk)
            }).OrderBy(res => res.NumberOfClass);
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
        #endregion

        #region Themes
        [Route("api/admin/getThemes")]
        [HttpGet]
        public IEnumerable<ThemeContainer> GetThemes()
        {
            var themes = _entities.tTheme.Where(t => !t.deleted).Select(t => new ThemeContainer
            {
                Id = t.pk,
                Synonym = t.synonym,
                ClassNumber = _entities.tClassNumber.Where(cn => cn.pk == t.fkClassNumber).Select(cn=>cn.numberOfClass).FirstOrDefault()
            });
            return themes;
        }

        [Route("api/admin/addTheme")]
        [HttpGet]
        public void AddTheme(String synonym, Guid classId)
        {
            tTheme newTheme = new tTheme
            {
                synonym = synonym,
                fkClassNumber = classId,
                name = synonym
            };
            _entities.tTheme.Add(newTheme);

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

        [Route("api/admin/removeTheme")]
        [HttpGet]
        public void RemoveTheme(Guid id)
        {
            var oldTheme = _entities.tTheme.FirstOrDefault(t => t.pk == id && !t.deleted);

            if (oldTheme != null)
            {
                oldTheme.deleted = true;
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
            else
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("Такой темы не существует"))
                };
                throw new HttpResponseException(resp);
            }
        }
        #endregion

        #region Users
        [Route("api/admin/getUsers")]
        [HttpGet]
        public IEnumerable<UsersInfo> GetUsers()
        {
            var users = _entities.aspnet_Users.Select(us => new UsersInfo
            {
                Id = us.UserId,
                LastActivityDate = us.LastActivityDate,
                Name = us.UserName,
                Role = _entities.aspnet_Roles
                    .Where(r => us.aspnet_Roles.Any( ur => ur.RoleId == r.RoleId ))
                    .Select(r => new RoleContainer{ Id = r.RoleId, Name = r.RoleName}).FirstOrDefault()
            });
            return users;           
        }

        [Route("api/admin/updateUserRole")]
        [HttpGet]
        public void UpdateUserRole(Guid userId, Guid roleId)
        {
            var user = _entities.aspnet_Users.FirstOrDefault(us => us.UserId == userId);
            var roles = _entities.aspnet_Roles.Where(r => r.RoleId == roleId).ToList().FirstOrDefault();            
            
            if (user != null)
            {
                //Roles.AddUserToRole(user.UserName, roles.RoleName);               
                //user.aspnet_Roles = roles;
            }

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

        [Route("api/admin/getRoles")]
        [HttpGet]
        public IEnumerable<RoleContainer> GetRoles()
        {
            var roles = _entities.aspnet_Roles.Select(r => new RoleContainer
            {
                Id = r.RoleId,
                Name = r.RoleName
            });
            return roles;                      
        }        
        #endregion

        #region Tests
        [Route("api/admin/getQuestions")]
        [HttpGet]
        public IEnumerable<QuestionContainer> GetQuestions()
        {
            var questions = _entities.tQuestion.Select(q => new QuestionContainer
            {
                Id = q.pk,
                Text = q.questionText,
                NumberOfClass = _entities.tClassNumber.Where(cn => q.fkType == cn.pk).Select(cn=>cn.numberOfClass).FirstOrDefault(),
                Theme = _entities.tTheme.Where(t => q.fkTheme == t.pk).Select(t => t.synonym).FirstOrDefault(),
                Type = _entities.tQuestionType.Where(qt => q.fkType == qt.pk).Select(qt => qt.synonym).FirstOrDefault()
            });
            return questions;
        }

        [Route("api/admin/getQuestionTypes")]
        [HttpGet]
        public IEnumerable<QuestionTypeContainer> GetQuestionTypes()
        {
            var types = _entities.tQuestionType.Select(qt => new QuestionTypeContainer
            {
                Id = qt.pk,
                Synonym = qt.synonym,
                Name = qt.name
            });
            return types;
        }

        [Route("api/admin/createTestQuestion/{:answer}")]
        [HttpPost]
        public void СreateTestQuestion(Guid themeId, String question, [FromBody] RightTestAnswers[] answers)
        {
            tTheme newTheme = new tTheme
            {
                synonym = "bla",
                fkClassNumber = themeId,
                name = "bla"
            };
            _entities.tTheme.Add(newTheme);

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

        //[Route("api/admin/removeQuestion")]
        //[HttpGet]
        //public void RemoveQuestion(Guid id)
        //{
        //    var oldTheme = _entities.tTheme.FirstOrDefault(t => t.pk == id && !t.deleted);

        //    if (oldTheme != null)
        //    {
        //        oldTheme.deleted = true;
        //        try
        //        {
        //            _entities.SaveChanges();
        //        }
        //        catch (Exception ex)
        //        {
        //            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
        //            {
        //                Content = new StringContent(string.Format("Ошибка при сохранении данных"))
        //            };
        //            throw new HttpResponseException(resp);
        //        }
        //    }
        //    else
        //    {
        //        var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
        //        {
        //            Content = new StringContent(string.Format("Такой темы не существует"))
        //        };
        //        throw new HttpResponseException(resp);
        //    }
        //}
        #endregion

    }
}
