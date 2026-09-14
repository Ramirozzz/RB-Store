using Microsoft.EntityFrameworkCore;

namespace RBStore.Api.Database;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
    {
    }
}
