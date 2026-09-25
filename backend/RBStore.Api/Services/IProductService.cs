using RBStore.Api.Models;
using RBStore.Api.DTOs;
namespace RBStore.Api.Services;

public interface IProductService
{
    Task<List<Product>> GetAllAsync(string? search, string? sort);
    Task<Product> CreateAsync(CreateProductDto productDto);
    Task<Product?> GetByIdAsync(int id);
    Task<Product?> UpdateAsync(int id, UpdateProductDto productDto);
    Task<bool> DeleteAsync(int id);
}