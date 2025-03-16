namespace TakeAPeek_server.Controllers
{
    using Microsoft.AspNetCore.Builder;
    using TakeAPeek_server.Entities;
    using TakeAPeek_server.Services.IServices;


    public static class FolderEndpoints
    {
        public static void MapFolderEndpoints(WebApplication app)
        {
            app.MapGet("/folders", async (IFolderService folderService) => await folderService.GetAllFolders()).RequireAuthorization();

            app.MapGet("/folders/{id}", async (int id, IFolderService folderService) => await folderService.GetFolder(id)).RequireAuthorization();

            app.MapPost("/folders", async (Folder folder, IFolderService folderService) => await folderService.CreateFolder(folder)).RequireAuthorization("Editor", "Admin");

            app.MapPut("/folders/{id}", async (int id, Folder folder, IFolderService folderService) =>
            {
                folder.Id = id; // לוודא שה-ID מעודכן
                return await folderService.UpdateFolder(folder);
            }).RequireAuthorization("Editor", "Admin");

            app.MapDelete("/folders/{id}", async (int id, IFolderService folderService) => await folderService.DeleteFolder(id)).RequireAuthorization("Editor", "Admin");
        }
    }
}
