using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        try
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var orders = await _orderService.GetAllAsync(userId);

            return Ok(orders);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while retrieving orders."
            );
        }
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        try
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var order = await _orderService.GetByIdAsync(id, userId);

            if (order is null)
            {
                return NotFound("Order not found.");
            }

            return Ok(order);

        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while retrieving the order."
            );
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public async Task<ActionResult<Order>> CreateAsync(CreateOrderDto orderDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var order = await _orderService.CreateAsync(orderDto, userId);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while creating the order.");
        }
    }
}