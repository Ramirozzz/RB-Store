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

    public async Task<List<Product>> GetAllAsync(string? search, string? sort)
    {

        var query = _context.Products.Include(p => p.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p => p.Name.ToLower().Contains(search.ToLower()) ||
            p.Description.ToLower().Contains(search.ToLower()));
        }

        if (sort == "price-asc")
        {
            query = query.OrderBy(p => p.Price);
        }
        else if (sort == "price-desc")
        {
            query = query.OrderByDescending(p => p.Price);
        }
        else if (sort == "name-asc")
        {
            query = query.OrderBy(p => p.Name);
        }
        else if (sort == "name-desc")
        {
            query = query.OrderByDescending(p => p.Name);
        }
        else
        {
            query = query.OrderByDescending(p => p.CreatedAt);
        }

        return await query.ToListAsync();
    }

    public async Task<Product> AddAsync(Product product)
    {
        _context.Products.Add(product);

        await _context.SaveChangesAsync();

        return product;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
    }


    public async Task<Product?> UpdateAsync(Product product)
    {
        var existingProduct = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == product.Id);

        if (existingProduct is null)
        {
            return null;
        }

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.ImageUrl = product.ImageUrl;
        existingProduct.StockQuantity = product.StockQuantity;
        existingProduct.IsBestSeller = product.IsBestSeller;
        existingProduct.CategoryId = product.CategoryId;

        await _context.SaveChangesAsync();

        return existingProduct;

    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product is null)
        {
            return false;
        }
        _context.Products.Remove(product);

        await _context.SaveChangesAsync();

        return true;

    }
}