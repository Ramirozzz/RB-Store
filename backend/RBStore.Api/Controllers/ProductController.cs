using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using RBStore.Api.Database;
using RBStore.Api.Models;
using RBStore.Api.Services;
using RBStore.Api.DTOs;


namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        try
        {
            var products = await _productService.GetAllAsync();

            return Ok(products);

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while fetching products.");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        try
        {
            var product = await _productService.GetByIdAsync(id);

            if (product is null)
            {
                return NotFound();

            }

            return Ok(product);
        }
        catch (Exception)
        {
            return StatusCode(
               500,
               "An unexpected error occurred while retrieving the product."
           );
        }


    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
    {

        try
        {
            var product = await _productService.CreateAsync(productDto);

            return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.Id },
            product
            );
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while creating the product."
            );
        }

    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, UpdateProductDto productDto)
    {

        try
        {
            var product = await _productService.UpdateAsync(id, productDto);

            if (product is null)
            {
                NotFound("Product not found.");
            }

            return Ok(product);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while updating the product.");
        }

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteProduct(int id)
    {

        try
        {
            var deletedProduct = await _productService.DeleteAsync(id);

            if (!deletedProduct)
            {
                return NotFound("Product not found.");
            }

            return Ok("Product deleted successfully.");
        }
        catch (Exception)
        {

            return StatusCode(
            500,
            "An unexpected error occurred while deleting the product."
        );
        }

    }



}