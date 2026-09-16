using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }
    public async Task<List<Product>> GetAllAsync()
    {
        return await _productRepository.GetAllAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _productRepository.GetByIdAsync(id);
    }

    public async Task<Product> CreateAsync(CreateProductDto productDto)
    {

        if (string.IsNullOrEmpty(productDto.Name))
        {
            throw new ArgumentException("The product name is required");
        }

        if (productDto.Name.Length > 100)
            throw new ArgumentException("Product name cannot be longer than 100 characters.");

        if (productDto.Price <= 0)
            throw new ArgumentException("Product price must be greater than zero.");

        if (productDto.StockQuantity < 0)
            throw new ArgumentException("Stock quantity connot be under zero.");

        if (!string.IsNullOrWhiteSpace(productDto.ImageUrl) &&
        !Uri.IsWellFormedUriString(productDto.ImageUrl, UriKind.Absolute))
        {
            throw new ArgumentException(
                "Image URL is not valid."
            );
        }

        var product = new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            ImageUrl = productDto.ImageUrl,
            StockQuantity = productDto.StockQuantity,
            IsBestSeller = productDto.IsBestSeller
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

        if (string.IsNullOrWhiteSpace(productDto.Name))
        {
            throw new ArgumentException("Product name is required.");
        }

        if (productDto.Name.Length > 100)
        {
            throw new ArgumentException(
                "Product name cannot be longer than 100 characters."
            );
        }

        if (productDto.Price <= 0)
        {
            throw new ArgumentException(
                "Product price must be greater than zero."
            );
        }

        if (productDto.StockQuantity < 0)
        {
            throw new ArgumentException(
                "Stock quantity cannot be under zero."
            );
        }

        product.Name = productDto.Name;
        product.Description = productDto.Description;
        product.Price = productDto.Price;
        product.ImageUrl = productDto.ImageUrl;
        product.StockQuantity = productDto.StockQuantity;
        product.IsBestSeller = productDto.IsBestSeller;


        return await _productRepository.UpdateAsync(product);

    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _productRepository.DeleteAsync(id);
    }

}