using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IFolderService
    {
        Task<Folder> GetFolder(int id);
        Task<IEnumerable<Folder>> GetAllFolders();
        Task<Folder> CreateFolder(Folder folder);
        Task<Folder> UpdateFolder(Folder folder);
        Task<bool> DeleteFolder(int id);
    }
}
