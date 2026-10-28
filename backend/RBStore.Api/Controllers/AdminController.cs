using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;

namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(
    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
    Roles = "Admin"
)]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;
    private readonly IOrderService _orderService;
    private readonly IProductService _productService;
    private readonly ICategoryService _categoryService;

    public AdminController(
     IAdminService adminService,
     IOrderService orderService,
     IProductService productService,
     ICategoryService categoryService)

    {
        _adminService = adminService;
        _orderService = orderService;
        _productService = productService;
        _categoryService = categoryService;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<AdminDashboardDto>> GetDashboard()
    {
        try
        {
            var dashboard = await _adminService.GetDashboardAsync();

            return Ok(dashboard);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while retrieving the dashboard."
            );
        }
    }

    [HttpGet("orders")]
    public async Task<ActionResult<List<AdminOrderDto>>> GetOrders()
    {
        try
        {
            var orders = await _orderService.GetAllForAdminAsync();

            return Ok(orders);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while retrieving orders."
            );
        }
    }


    [HttpPut("orders/{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(
        int id,
        [FromBody] UpdateOrderStatusDto dto)
    {
        try
        {
            var order = await _orderService.UpdateStatusAsync(id, dto.Status);

            if (order is null)
            {
                return NotFound("Order not found.");
            }

            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "Something went wrong while updating the order status."
            );
        }
    }


    [HttpGet("users")]
    public async Task<ActionResult<List<AdminUserDto>>> getUsers()
    {
        try
        {
            var users = await _adminService.getAllUsersAsync();
            return Ok(users);
        }
        catch (Exception)
        {

            return StatusCode(
          500,
          "An unexpected error occurred while retrieving users."
      );
        }
    }

    [HttpGet("products")]
    public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] string? search,
    [FromQuery] string? sort)
    {
        try
        {
            var products = await _productService.GetAllAsync(search, sort);

            return Ok(products);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while retrieving products."
            );
        }
    }

    [HttpGet("orders/recent")]
    public async Task<ActionResult<List<AdminOrderDto>>> GetRecentOrders()
    {
        var orders = await _orderService.GetRecentForAdminAsync();

        return Ok(orders);
    }

}