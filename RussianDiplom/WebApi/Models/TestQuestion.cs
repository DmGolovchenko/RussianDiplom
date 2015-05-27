namespace RussianDiplom.WebApi.Models
{
    using System;

    public class TestQuestion
    {
        public Guid ThemeId { get; set; }
        public Guid ClassId { get; set; }
        public String TypeName { get; set; }
        public String Question { get; set; }
        public RightTestAnswers[] Answers { get; set; }
    }
}