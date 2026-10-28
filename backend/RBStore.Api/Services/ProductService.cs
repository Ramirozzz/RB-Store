using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }
    public async Task<List<Product>> GetAllAsync(string? search, string? sort)
    {
        return await _productRepository.GetAllAsync(search, sort);
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _productRepository.GetByIdAsync(id);
    }

    public async Task<Product> CreateAsync(CreateProductDto productDto)
    {

        var category = await _categoryRepository.GetByIdAsync(productDto.CategoryId);

        if (category is null)
        {
            throw new ArgumentException("Category not found.");
        }

        var product = new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            ImageUrl = productDto.ImageUrl,
            StockQuantity = productDto.StockQuantity,
            IsBestSeller = productDto.IsBestSeller,
            CategoryId = productDto.CategoryId
        };

        return await _productRepository.AddAsync(product);
    }

    public async Task<Product?> UpdateAsync(int id, UpdateProductDto productDto)
    {
        var product = await _productRepository.GetByIdAsync(id);

        if (product is null)
        {
            return null;
        }

        var category = await _categoryRepository.GetByIdAsync(productDto.CategoryId);

        if (category is null)
        {
            throw new ArgumentException("Category not found.");
        }

        product.Name = productDto.Name;
        product.Description = productDto.Description;
        product.Price = productDto.Price;
        product.ImageUrl = productDto.ImageUrl;
        product.StockQuantity = productDto.StockQuantity;
        product.IsBestSeller = productDto.IsBestSeller;
        product.CategoryId = productDto.CategoryId;


        return await _productRepository.UpdateAsync(product);

    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _productRepository.DeleteAsync(id);
    }

}