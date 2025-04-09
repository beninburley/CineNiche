// using CineNiche.API.Data;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
// using CineNiche.API.Services;
// using RootkitAuth.API.Data;
// using System.Security.Claims;

// var builder = WebApplication.CreateBuilder(args);

// // Basic services
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen(options =>
// {
//     options.SwaggerDoc("v1", new OpenApiInfo
//     {
//         Title = "CineNiche.API",
//         Version = "v1",
//         Description = "API for managing CineNiche movies and ratings"
//     });
// });

// // DB contexts
// builder.Services.AddDbContext<MovieDbContext>(options =>
//     options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

// builder.Services.AddDbContext<RecommendationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("RecommendConnection")));

// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

// // Identity setup
// builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
// {
//     options.User.RequireUniqueEmail = true;
// })
//     .AddEntityFrameworkStores<ApplicationDbContext>()
//     .AddDefaultTokenProviders();

// // Cookie configuration (no need to explicitly add the scheme)
// builder.Services.ConfigureApplicationCookie(options =>
// {
//     options.Cookie.HttpOnly = true;
//     options.Cookie.SameSite = SameSiteMode.None; // Required for cross-origin cookies
//     options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Secure cookies in production
//     options.Cookie.Name = ".AspNetCore.Identity.Application";
//     options.LoginPath = "/login";
// });

// // Map Identity API endpoints
// builder.Services.AddIdentityApiEndpoints<IdentityUser>();

// // Authorization
// builder.Services.AddAuthorization();

// // Custom claims
// builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// // CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend", policy =>
//     {
//         policy.WithOrigins(
//             "http://localhost:3000", // Development
//             "https://mango-wave-0d9aec81e.6.azurestaticapps.net" // Production
//         )
//         .AllowCredentials()
//         .AllowAnyHeader()
//         .AllowAnyMethod();
//     });
// });

// // Email placeholder
// builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

// var app = builder.Build();

// // Middleware
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseCors("AllowFrontend");
// app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();
// app.MapGroup("/").MapIdentityApi<IdentityUser>();

// // Logout endpoint
// app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
// {
//     await signInManager.SignOutAsync();
//     context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
//     {
//         HttpOnly = true,
//         Secure = true,
//         SameSite = SameSiteMode.None
//     });
//     return Results.Ok(new { message = "Logout successful" });
// }).RequireAuthorization();

// // Auth check
// app.MapGet("/pingauth", (ClaimsPrincipal user) =>
// {
//     if (!user.Identity?.IsAuthenticated ?? false)
//         return Results.Unauthorized();

//     var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
//     return Results.Json(new { email });
// }).RequireAuthorization();

// // Role seeding
// using (var scope = app.Services.CreateScope())
// {
//     var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
//     var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

//     var roleName = "Administrator";
//     if (!await roleManager.RoleExistsAsync(roleName))
//     {
//         await roleManager.CreateAsync(new IdentityRole(roleName));
//     }

//     var adminEmail = "jefferson@cineniche.com";
//     var adminUser = await userManager.FindByEmailAsync(adminEmail);
//     if (adminUser != null && !await userManager.IsInRoleAsync(adminUser, roleName))
//     {
//         await userManager.AddToRoleAsync(adminUser, roleName);
//     }
// }

// app.Run();





using CineNiche.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

//Wells stuff
using System.Security.Claims;
using CineNiche.API.Services;
using RootkitAuth.API.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "CineNiche.API",
        Version = "v1",
        Description = "API for managing CineNiche movies and ratings"
    });
});

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

builder.Services.AddDbContext<RecommendationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RecommendConnection")));
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddAuthorization();

// builder.Services.AddIdentity<IdentityUser, IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDbContext>()
//     .AddDefaultTokenProviders();

builder.Services.AddIdentityCore<IdentityUser>(options =>
{
    options.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>() // ✅ Adds RoleManager support
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

// builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
//     .AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.AddIdentityApiEndpoints<IdentityUser>(); // This stays to expose endpoints
 //This needs to be uncommented for deployment

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None; // change after adding https for production, change to strict i think
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://mango-wave-0d9aec81e.6.azurestaticapps.net")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
              
    });
});

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();


var app = builder.Build(); // move this before app.UseCors()

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend"); // ? now it's in the right spot

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Added MapGroup ???
app.MapGroup("/").MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None //update later
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    // Ensure the Administrator role exists
    string roleName = "Administrator";
    if (!await roleManager.RoleExistsAsync(roleName))
    {
        await roleManager.CreateAsync(new IdentityRole(roleName));
    }

    // Assign the role to a specific admin user
    var adminEmail = "jefferson@cineniche.com"; // 
    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser != null && !await userManager.IsInRoleAsync(adminUser, roleName))
    {
        await userManager.AddToRoleAsync(adminUser, roleName);
    }
}


app.Run();

