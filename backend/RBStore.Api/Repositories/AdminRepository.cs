using Microsoft.EntityFrameworkCore;
using RBStore.Api.Database;
using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public class AdminRepository : IAdminRepository
{
    private readonly AppDbContext _context;

    public AdminRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> GetTotalProductsAsync()
    {
        return await _context.Products.CountAsync();
    }


    public async Task<int> GetTotalOrdersAsync()
    {
        return await _context.Orders.CountAsync();
    }

    public async Task<int> GetTotalCustomersAsync()
    {
        return await _context.Set<User>().CountAsync();
    }

    public async Task<int> GetLowStockProductsAsync()
    {
        return await _context.Products.CountAsync(product => product.StockQuantity <= 5);
    }
}