using TakeAPeek_server.Services.IServices;
using TakeAPeek_server.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace TakeAPeek_server.Controllers
{
    public static class FileEndpoints
    {
        public static void MapFileEndpoints(WebApplication app)
        {
            app.MapGet("/files", async (IFileService fileService) => await fileService.GetAllFiles())
                .RequireAuthorization(); ;

            app.MapGet("/files/{id}", async (int id, IFileService fileService) => await fileService.GetFile(id))
                .RequireAuthorization(); ;

            app.MapPost("/files", async (TakeAPeek_server.Entities.File file, IFileService fileService) => await fileService.CreateFile(file))
                 .RequireAuthorization("Editor", "Admin"); ;

            app.MapPut("/files/{id}", async (int id, TakeAPeek_server.Entities.File file, IFileService fileService) =>
            {
                file.Id = id; // לוודא שה-ID מעודכן
                return await fileService.UpdateFile(file);
            }).RequireAuthorization( "Editor", "Admin" ); ;

            app.MapDelete("/files/{id}", async (int id, IFileService fileService) => await fileService.DeleteFile(id)).RequireAuthorization( "Editor", "Admin"); ;
        }
    }
}

