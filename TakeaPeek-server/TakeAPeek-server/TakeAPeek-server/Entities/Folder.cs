namespace TakeAPeek_server.Entities
{
    public class Folder
    {
        
            public int Id { get; set; } // Corresponds to id INT PRIMARY KEY
            public int UserId { get; set; } // Corresponds to user_id INT FOREIGN KEY → Users(id)
            public int? ParentId { get; set; } // Corresponds to parent_id INT FOREIGN KEY → Folders(id), NULLABLE
            public string Name { get; set; } // Corresponds to name VARCHAR(100) NOT NULL
            public DateTime CreatedAt { get; set; } = DateTime.Now; // Corresponds to created_at DATETIME DEFAULT NOW()
            public DateTime UpdatedAt { get; set; } = DateTime.Now; // Corresponds to updated_at DATETIME ON UPDATE NOW()
        

    }
}
