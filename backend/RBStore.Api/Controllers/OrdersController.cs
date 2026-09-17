using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;

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

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        try
        {
            var orders = await _orderService.GetAllAsync();

            return Ok(orders);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while retrieving orders."
            );
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        try
        {
            var order = await _orderService.GetByIdAsync(id);

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

    [HttpPost]

    public async Task<ActionResult<Order>> CreateAsync(CreateOrderDto orderDto)
    {
        try
        {
            var order = await _orderService.CreateAsync(orderDto);

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