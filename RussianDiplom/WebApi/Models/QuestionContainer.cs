namespace RussianDiplom.WebApi.Models
{
    using System;

    public class QuestionContainer
    {
        public Guid Id { get; set; }
        public String Text { get; set; }
        public String Type { get; set; }
        public String Theme { get; set; }
        public Int32 NumberOfClass { get; set; }
    }
}