using Microsoft.EntityFrameworkCore;
using RBStore.Api.Database;
using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        return await _context.Users.FindAsync(id);
    }


}