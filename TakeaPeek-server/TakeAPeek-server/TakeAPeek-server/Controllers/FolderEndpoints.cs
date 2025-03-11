namespace TakeAPeek_server.Controllers
{
    using Microsoft.AspNetCore.Builder;
    using TakeAPeek_server.Entities;
    using TakeAPeek_server.Services.IServices;

    //public static class FolderEndpoints
    //{
    //    public static void MapFolderEndpoints(WebApplication app, IFolderService folderService)
    //    {
    //        app.MapGet("/folders", async () => await folderService.GetAllFolders());

    //        app.MapGet("/folders/{id}", async (int id) => await folderService.GetFolder(id));

    //        app.MapPost("/folders", async (Folder folder) => await folderService.CreateFolder(folder));

    //        app.MapPut("/folders/{id}", async (int id, Folder folder) =>
    //        {
    //            folder.Id = id; // לוודא שה-ID מעודכן
    //            return await folderService.UpdateFolder(folder);
    //        });

    //        app.MapDelete("/folders/{id}", async (int id) => await folderService.DeleteFolder(id));
    //    }
    //}

    public static class FolderEndpoints
    {
        public static void MapFolderEndpoints(WebApplication app)
        {
            app.MapGet("/folders", async (IFolderService folderService) => await folderService.GetAllFolders());

            app.MapGet("/folders/{id}", async (int id, IFolderService folderService) => await folderService.GetFolder(id));

            app.MapPost("/folders", async (Folder folder, IFolderService folderService) => await folderService.CreateFolder(folder));

            app.MapPut("/folders/{id}", async (int id, Folder folder, IFolderService folderService) =>
            {
                folder.Id = id; // לוודא שה-ID מעודכן
                return await folderService.UpdateFolder(folder);
            });

            app.MapDelete("/folders/{id}", async (int id, IFolderService folderService) => await folderService.DeleteFolder(id));
        }
    }
}
