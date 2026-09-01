using SoulRegistry.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddHubOptions(options =>
    {
        // 将最大消息大小修改为 5MB (默认只有 32KB)
        options.MaximumReceiveMessageSize = 5 * 1024 * 1024;
    });

// 在 builder.Build() 之前添加：
IFreeSql fsql = new FreeSql.FreeSqlBuilder()
    .UseConnectionString(FreeSql.DataType.Sqlite, @"Data Source=ghostbook.db")
    .UseAutoSyncStructure(true) // 开发环境下自动建表
    .Build();

builder.Services.AddSingleton<IFreeSql>(fsql);
builder.Services.AddScoped<SoulRegistry.Data.GhostService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}
app.UseAntiforgery();
app.UseStaticFiles();
app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
