using TakeAPeek_server.Entities;
using TakeAPeek_server.Services.IServices;

namespace TakeAPeek_server.Controllers
{
    //public static class UserEndpoints
    //{
    //    public static void MapUserEndpoints(WebApplication app, IUserService userService)
    //    {
    //        app.MapGet("/users", async () => await userService.GetAllUsers());

    //        app.MapGet("/users/{id}", async (int id) => await userService.GetUser(id));

    //        app.MapPost("/users", async (User user) => await userService.CreateUser(user));

    //        app.MapPut("/users/{id}", async (int id, User user) =>
    //        {
    //            user.Id = id; // לוודא שה-ID מעודכן
    //            return await userService.UpdateUser(user);
    //        });

    //        app.MapDelete("/users/{id}", async (int id) => await userService.DeleteUser(id));
    //    }
    //}

    using Microsoft.AspNetCore.Builder;
   

    public static class UserEndpoints
    {
        public static void MapUserEndpoints(WebApplication app)
        {
            app.MapGet("/users", async (IUserService userService) => await userService.GetAllUsers());

            app.MapGet("/users/{id}", async (int id, IUserService userService) => await userService.GetUser(id));

            app.MapPost("/users", async (User user, IUserService userService) => await userService.CreateUser(user));

            app.MapPut("/users/{id}", async (int id, User user, IUserService userService) =>
            {
                user.Id = id; // לוודא שה-ID מעודכן
                return await userService.UpdateUser(user);
            });

            app.MapDelete("/users/{id}", async (int id, IUserService userService) => await userService.DeleteUser(id));
        }
    }

}
