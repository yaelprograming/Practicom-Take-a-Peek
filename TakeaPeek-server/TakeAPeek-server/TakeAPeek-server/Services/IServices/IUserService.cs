using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Services.IServices
{
    public interface IUserService
    {
        Task<User> GetUser(int Id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> CreateUser(User user);
        Task<User> UpdateUser(User user);
        Task<bool> DeleteUser(int Id);
    }
}
