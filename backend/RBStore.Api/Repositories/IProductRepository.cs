using RBStore.Api.Models;
namespace RBStore.Api.Repositories;

public interface IProductRepository
{
    // methods
    Task<List<Product>> GetAllAsync(string? search, string? sort);
    Task<Product?> GetByIdAsync(int id);
    Task<Product> AddAsync(Product product);
    Task<Product?> UpdateAsync(Product product);
    Task<bool> DeleteAsync(int id);

}