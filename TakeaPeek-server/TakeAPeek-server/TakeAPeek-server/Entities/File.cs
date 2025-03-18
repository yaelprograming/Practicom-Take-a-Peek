namespace TakeAPeek_server.Entities
{
    public class File
    {
        public int Id { get; set; } // מזהה ייחודי
        public string FileName { get; set; } // שם הקובץ כפי שהועלה למערכת
        public string FileType { get; set; } // סוג הקובץ (pdf, jpg וכו')
        public long Size { get; set; } // גודל הקובץ בבתים
        public string S3Key { get; set; } // מזהה הקובץ ב-S3
        public int? FolderId { get; set; } // תיקיית היעד (null אם לא משויך לתיקיה)
        public int OwnerId { get; set; } // בעל הקובץ
        public DateTime CreatedAt { get; set; } // תאריך העלאה
        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון
        public bool IsDeleted { get; set; } // דגל למחיקה רכה
    }
}
