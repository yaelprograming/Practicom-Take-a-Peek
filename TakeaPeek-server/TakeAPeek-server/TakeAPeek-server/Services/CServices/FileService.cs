using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
    public class FileService : IFileService
    {
        // Assume _context is your database context
        private readonly DataContext _context;

        public FileService(DataContext context)
        {
            _context = context;
        }

        public async Task<TakeAPeek_server.Entities.File> GetFileAsync(int id) => await _context.Files.FindAsync(id);

        public async Task<IEnumerable<TakeAPeek_server.Entities.File>> GetAllFilesAsync() => await _context.Files.ToListAsync();

        public async Task<TakeAPeek_server.Entities.File> CreateFileAsync(TakeAPeek_server.Entities.File file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<TakeAPeek_server.Entities.File> UpdateFileAsync(TakeAPeek_server.Entities.File file)
        {
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            TakeAPeek_server.Entities.File file = await GetFileAsync(id);
            if (file == null) return false;

            _context.Files.Remove(file);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<Entities.File> GetFile(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Entities.File>> GetAllFiles()
        {
            throw new NotImplementedException();
        }

        public Task<Entities.File> CreateFile(TakeAPeek_server.Entities.File file)
        {
            throw new NotImplementedException();
        }

        public Task<Entities.File> UpdateFile(TakeAPeek_server.Entities.File file)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteFile(int id)
        {
            throw new NotImplementedException();
        }
    }
}
