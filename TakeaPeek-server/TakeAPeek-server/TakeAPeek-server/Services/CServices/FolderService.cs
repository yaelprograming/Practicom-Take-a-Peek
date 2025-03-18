﻿using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class FolderService : IFolderService
    {
        private readonly DataContext _context;

        public FolderService(DataContext context)
        {
            _context = context;
        }
        public async Task<Folder> CreateFolder(Folder folder)
        {
            _context.Folders.Add(folder);
            await _context.SaveChangesAsync();
            return folder;
        }
     
        public async Task<bool> DeleteFolder(int id)
        {
            var folder = await GetFolder(id);
            if (folder == null) return false;

            // מחיקת כל התיקיות והקבצים הילדים
            var childFolders = await _context.Folders
                .Where(f => f.ParentFolderId == id && !f.IsDeleted)
                .ToListAsync();
            foreach (var child in childFolders)
            {
                await DeleteFolder(child.Id); // מחיקה רכה של התיקיות הילדים
            }

            // מחיקת הקבצים שבתוך התיקיה
            var files = await _context.Files
                .Where(f => f.FolderId == id && !f.IsDeleted)
                .ToListAsync();
            foreach (var file in files)
            {
                file.IsDeleted = true; // שינוי ל-Soft Delete
                _context.Files.Update(file);
            }

            // שינוי ל-Soft Delete לתיקיה הנוכחית
            folder.IsDeleted = true;
            _context.Folders.Update(folder);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Folder>> GetAllFolders() => await _context.Folders.Where(f => !f.IsDeleted).ToListAsync();

        public async Task<Folder> GetFolder(int id) => await _context.Folders.Where(f => f.Id == id && !f.IsDeleted)
                .FirstOrDefaultAsync();

        public async Task<Folder> UpdateFolder(Folder folder)
        {
            _context.Folders.Update(folder);
            await _context.SaveChangesAsync();
            return folder;
        }

        //מחזיר את תקית האבא
        public async Task<Folder> GetParentFolderAsync(int folderId)
        {
            // מציאת התיקיה לפי ה-ID שלה
            var folder = await _context.Folders.FindAsync(folderId);
            return folder?.ParentFolderId != null ? await _context.Folders.FindAsync(folder.ParentFolderId) : null;
        }

        //הענף
        public async Task<List<Folder>> GetBreadcrumb(int folderId)
        {
            var breadcrumbs = new List<Folder>();
            var currentFolderId = folderId;

            while (currentFolderId != null)
            {
                var folder = await _context.Folders
                    .Where(f => f.Id == currentFolderId && !f.IsDeleted)
                    .FirstOrDefaultAsync();

                if (folder == null)
                    break; // אם לא מצאנו תיקיה, יציאה מהלולאה

                breadcrumbs.Add(folder); // הוסף את התיקיה לרשימה

                if (folder.ParentFolderId == null)
                    break; // אם ParentFolderId הוא null, יציאה מהלולאה

                currentFolderId = folder.ParentFolderId.Value; // עבור לתיקיית האב
            }

            breadcrumbs.Reverse(); // הפוך את הרשימה כך שהשורש יהיה ראשון
            return breadcrumbs;
        }

        //?
        public async Task<IEnumerable<Folder>> GetFoldersByParentId(int parentId)
        {
            return await _context.Folders
                .Where(f => f.ParentFolderId == parentId) 
                .ToListAsync();
        }


    }
}

