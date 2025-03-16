using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Services.CServices
{
   
        //   public User GetById() =>{return new User(); }
        public class UserService : IUserService
        {
            private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<User> GetUser(int id) => await _context.Users.FindAsync(id);

            public async Task<IEnumerable<User>> GetAllUsers()
            {
                return await _context.Users.ToListAsync();
            }

            public async Task<User> CreateUser(User User)
            {
                _context.Users.Add(User);
                await _context.SaveChangesAsync();
                return User;
            }

            public async Task<User> UpdateUser(User User)
            {
                _context.Users.Update(User);
                await _context.SaveChangesAsync();
                return User;
            }

            public async Task<bool> DeleteUser(int id)
            {
                var User = await GetUser(id);
                if (User == null) return false;

                _context.Users.Remove(User);
                await _context.SaveChangesAsync();
                return true;
            }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            User user = await _context.Users.FindAsync(username);
            if (user == null || !user.Password.Equals(password))
            {
                return null;
            }

            return "succed";
        }
    }
    }

