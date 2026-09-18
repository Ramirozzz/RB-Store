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

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        return await _context.Users.FindAsync(id);
    }

    //    public async Task<List<User>> GetAllAsync()
    // {
    //     return await _context.Users.Include(u => u.Orders).ToListAsync();
    // }

    // public async Task<User?> GetByIdAsync(int id)
    // {
    //     return await _context.Users.Include(u => u.Orders).FirstOrDefaultAsync(u => u.Id == id);
    // }

    public async Task<User> AddAsync(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }
}