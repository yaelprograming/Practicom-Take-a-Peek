using Microsoft.OpenApi.Models;
using TakeAPeek_server.Controllers;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Services.CServices;
using TakeAPeek_server.Services.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection; // Add this line
using Microsoft.Extensions.Configuration; // Add this line

var builder = WebApplication.CreateBuilder(args);

// הוסף את ה-DbContext עם ספק בסיס הנתונים
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// =========== add services =========== 
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IFolderService, FolderService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<ICollageService, CollageService>();
builder.Services.AddScoped<IUserService, UserService>();

// ========== add Swagger =============
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TakeAPeek API", Version = "v1" });
});

var app = builder.Build();

// =========== run Swagger ============
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TakeAPeek API V1");
    c.RoutePrefix = string.Empty; // זה מגדיר שה-Swagger UI יהיה ב-root של האפליקציה
});

// =========== endpoints injection ===========
FileEndpoints.MapFileEndpoints(app);
FolderEndpoints.MapFolderEndpoints(app);
TagEndpoints.MapTagEndpoints(app);
CollageEndpoints.MapCollageEndpoints(app);
UserEndpoints.MapUserEndpoints(app);

app.Run();
