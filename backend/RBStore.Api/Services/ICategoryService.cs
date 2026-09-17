using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<Category> CreateAsync(CreateCategoryDto categoryDto);
    Task<Category?> UpdateAsync(int id, UpdateCategoryDto categoryDto);
    Task<bool> DeleteAsync(int id);

}