namespace TakeAPeek_server.Controllers
{
    using Microsoft.AspNetCore.Builder;
    using NLog;
    using TakeAPeek_server.Entities;
    using TakeAPeek_server.Services.IServices;


    public static class FolderEndpoints
    {
        
        public static void MapFolderEndpoints(WebApplication app)
        {
            var logger = LogManager.GetCurrentClassLogger();
            LogManager.LoadConfiguration("NLog.config");

            app.MapGet("/folders", async (IFolderService folderService) => await folderService.GetAllFolders());//.RequireAuthorization();

            app.MapGet("/folders/{id}", async (int id, IFolderService folderService) => await folderService.GetFolder(id));//.RequireAuthorization();

            app.MapPost("/folders", async (Folder folder, IFolderService folderService) => await folderService.CreateFolder(folder));//.RequireAuthorization("Editor", "Admin");

            app.MapPut("/folders/{id}", async (int id, Folder folder, IFolderService folderService) =>
            {
                folder.Id = id; // לוודא שה-ID מעודכן
                return await folderService.UpdateFolder(folder);
            });//.RequireAuthorization("Editor", "Admin");

            app.MapDelete("/folders/{id}", async (int id, IFolderService folderService) => await folderService.DeleteFolder(id));//.RequireAuthorization("Editor", "Admin");

            //תקיה עם כל התוכן שבתוכה

            app.MapGet("/folders/{id?}/contents", async (int? id, IFolderService folderService, IFileService fileService) =>
            {
                int folderId = id ?? 0; // אם אין ID, חפש בתיקיית השורש (נניח שזה 0)

                var folder = folderId == 0 ? null : await folderService.GetFolder(folderId);
                if (folderId != 0 && folder == null) return Results.NotFound("Folder not found");

                // כאן אתה שולף את התיקיות והקבצים תחת התיקיה הנוכחית
                //var current = await folderService.GetParentFolderAsync(folderId);
                var subFolders = await folderService.GetFoldersByParentId(folderId); // שלוף את התיקיות תחת התיקיה הנוכחית
                var files = await fileService.GetFilesByFolderId(folderId); // שלוף את הקבצים תחת התיקיה הנוכחית

                return Results.Ok(new { folders = subFolders, files = files });
            });

            //שליפה לפי האבא
            app.MapGet("/folders/{id}/parent", async (int id, IFolderService folderService) =>
            {
                var parentFolder = await folderService.GetParentFolderAsync(id);
                return parentFolder != null ? Results.Ok(parentFolder) : Results.NotFound();
            });

            //כל הענף
            app.MapGet("/folders/{id?}/breadcrumb", async (int id, IFolderService folderService) =>
            {
                var breadcrumb = await folderService.GetBreadcrumb(id); // קריאה לפונקציה ב-IFolderService
                return breadcrumb != null ? Results.Ok(breadcrumb) : Results.NotFound();
            });

        }
    }
}
