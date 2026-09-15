using Microsoft.EntityFrameworkCore;
using RBStore.Api.Database;
using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
    }
}