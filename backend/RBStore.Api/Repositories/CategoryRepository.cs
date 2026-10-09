using Microsoft.EntityFrameworkCore;
using RBStore.Api.Database;
using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.OrderByDescending(category => category.Id).ToListAsync();
    }

    public async Task<Category> AddAsync(Category category)
    {
        _context.Categories.Add(category);

        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task<Category?> UpdateAsync(Category category)
    {
        var existingCategory = await _context.Categories.FindAsync(category.Id);

        if (existingCategory is null)
        {
            return null;
        }

        existingCategory.Name = category.Name;

        await _context.SaveChangesAsync();

        return existingCategory;

    }

    public async Task<bool> DeleteAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category is null)
        {
            return false;
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return true;
    }
}