using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using RBStore.Api.Database;
using RBStore.Api.Models;
using RBStore.Api.Services;

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
        var products = await _productService.GetAllAsync();

        return Ok(products);
    }

}