namespace TakeAPeek_server.Entities
{
    public class File
    {
      
            public int Id { get; set; } // Corresponds to id INT PRIMARY KEY
            public int UserId { get; set; } // Corresponds to user_id INT FOREIGN KEY → Users(id)
            public int FolderId { get; set; } // Corresponds to folder_id INT FOREIGN KEY → Folders(id)
            public string Filename { get; set; } // Corresponds to filename VARCHAR(255) NOT NULL
            public string Url { get; set; } // Corresponds to url TEXT NOT NULL
            public int Size { get; set; } // Corresponds to size INT NOT NULL
            public DateTime CreatedAt { get; set; } = DateTime.Now; // Corresponds to created_at DATETIME DEFAULT NOW()
            public DateTime UpdatedAt { get; set; } = DateTime.Now; // Corresponds to updated_at DATETIME ON UPDATE NOW()
        

    }
}
