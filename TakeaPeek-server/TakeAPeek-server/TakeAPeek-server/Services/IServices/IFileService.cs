
namespace TakeAPeek_server.Services.IServices
{
    public interface IFileService
    {
        Task<TakeAPeek_server.Entities.File> GetFile(int id);
        Task<IEnumerable<TakeAPeek_server.Entities.File>> GetAllFiles();
        Task<TakeAPeek_server.Entities.File> CreateFile(TakeAPeek_server.Entities.File file);
        Task<TakeAPeek_server.Entities.File> UpdateFile(TakeAPeek_server.Entities.File file);
        Task<bool> DeleteFile(int id);
        //?
        Task<IEnumerable<TakeAPeek_server.Entities.File>> GetFilesByFolderId(int folderId); // הוסף כאן

    }
}