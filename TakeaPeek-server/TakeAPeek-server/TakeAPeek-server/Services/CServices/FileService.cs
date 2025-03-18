using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class FileService : IFileService
    {
        private readonly DataContext _context;

        public FileService(DataContext context)
        {
            _context = context;
        }

        public async Task<TakeAPeek_server.Entities.File> GetFile(int id) => await _context.Files.Where(f => f.Id == id && !f.IsDeleted).FirstOrDefaultAsync();

        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetAllFiles() 
        {
            return await _context.Files.Where(f => !f.IsDeleted).ToListAsync();
        }

        public async Task<TakeAPeek_server.Entities.File> CreateFile(TakeAPeek_server.Entities.File file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<TakeAPeek_server.Entities.File> UpdateFile(TakeAPeek_server.Entities.File file)
        {
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<bool> DeleteFile(int id)
        {
            TakeAPeek_server.Entities.File file = await GetFile(id);
            if (file == null) return false;

            file.IsDeleted = true; 
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreFile(int id)
        {
            var file = await _context.Files
                .Where(f => f.Id == id && f.IsDeleted)
                .FirstOrDefaultAsync();
            if (file == null) return false;

            file.IsDeleted = false; 
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return true;
        }


        //מחזיר את תקית האבא
        public async Task<Folder> GetParentFolderAsync(int fileId)
        {
            // מציאת התיקיה לפי ה-ID שלה
            var file = await _context.Files.FindAsync(fileId);
            return file?.FolderId != null ? await _context.Folders.FindAsync(file.FolderId) : null;
        }
        //שליפה לפי תקיה
        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetFilesByFolder(int folderId)
        {
            return await _context.Files
                .Where(f => f.FolderId == folderId && !f.IsDeleted)
                .ToListAsync();
        }

        //?
        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetFilesByFolderId(int folderId)
        {
            return await _context.Files
                .Where(f => f.FolderId == folderId) // הנחה שיש לך שדה FolderId
                .ToListAsync();
        }

    }
}

