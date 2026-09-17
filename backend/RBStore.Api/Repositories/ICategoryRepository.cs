using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
    Task<Category> AddAsync(Category category);
    Task<Category?> GetByIdAsync(int id);
    Task<Category?> UpdateAsync(Category category);
    Task<bool> DeleteAsync(int id);
}
