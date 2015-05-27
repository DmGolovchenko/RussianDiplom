namespace RussianDiplom.WebApi.Models
{
    using System;

    public class UsersInfo
    {
        public Guid Id { get; set; }
        public String Name { get; set; }       
        public DateTime LastActivityDate { get; set; }
        public RoleContainer Role { get; set; }
    }
}