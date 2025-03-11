using TakeAPeek_server.Services.IServices;
using TakeAPeek_server.Entities;

namespace TakeAPeek_server.Controllers
{
    //public static class FileEndpoints
    //{
    //    public static void MapFileEndpoints(WebApplication app, IFileService fileService)
    //    {
    //        app.MapGet("/files", async () => await fileService.GetAllFiles());

    //        app.MapGet("/files/{id}", async (int id) => await fileService.GetFile(id));

    //        app.MapPost("/files", async (TakeAPeek_server.Entities.File file) => await fileService.CreateFile(file));

    //        app.MapPut("/files/{id}", async (int id, TakeAPeek_server.Entities.File file) =>
    //        {
    //            file.Id = id; // לוודא שה-ID מעודכן
    //            return await fileService.UpdateFile(file);
    //        });

    //        app.MapDelete("/files/{id}", async (int id) => await fileService.DeleteFile(id));
    //    }
    //}
    public static class FileEndpoints
    {
        public static void MapFileEndpoints(WebApplication app)
        {
            app.MapGet("/files", async (IFileService fileService) => await fileService.GetAllFiles());

            app.MapGet("/files/{id}", async (int id, IFileService fileService) => await fileService.GetFile(id));

            app.MapPost("/files", async (TakeAPeek_server.Entities.File file, IFileService fileService) => await fileService.CreateFile(file));

            app.MapPut("/files/{id}", async (int id, TakeAPeek_server.Entities.File file, IFileService fileService) =>
            {
                file.Id = id; // לוודא שה-ID מעודכן
                return await fileService.UpdateFile(file);
            });

            app.MapDelete("/files/{id}", async (int id, IFileService fileService) => await fileService.DeleteFile(id));
        }
    }
}
