using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;

    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _categoryRepository.GetAllAsync();
    }

    public async Task<Category> CreateAsync(CreateCategoryDto categoryDto)
    {
        var category = new Category
        {
            Name = categoryDto.Name
        };

        return await _categoryRepository.AddAsync(category);
    }

    public async Task<Category?> UpdateAsync(int id, UpdateCategoryDto categoryDto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category is null)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(categoryDto.Name))
        {
            throw new ArgumentException("Category name is required.");
        }

        if (categoryDto.Name.Length > 50)
        {
            throw new ArgumentException("Category name cannot be longer than 50 characters.");
        }

        category.Name = categoryDto.Name;

        return await _categoryRepository.UpdateAsync(category);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _categoryRepository.DeleteAsync(id);
    }

}



