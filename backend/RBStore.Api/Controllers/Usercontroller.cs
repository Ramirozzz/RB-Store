using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;

namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IOrderService _orderService;

    public UsersController(IUserService userService, IOrderService orderService)
    {
        _userService = userService;
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        try
        {
            var users = await _userService.GetAllAsync();

            return Ok(users);
        }
        catch (Exception)
        {

            return StatusCode(500, "An unexpected error occurred while retrieving users.");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(string id)
    {
        try
        {
            var user = await _userService.GetByIdAsync(id);

            if (user is null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }
        catch (Exception)
        {

            return StatusCode(500, "An unexpected error occurred while retrieving the user.");
        }

    }

    [HttpGet("{id}/orders")]
    public async Task<ActionResult<List<Order>>> GetUserOrders(string id)
    {
        try
        {
            var orders = await _orderService.GetByUserIdAsync(id);

            return Ok(orders);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while retrieving user orders.");
        }
    }


    [HttpPost]
    public async Task<ActionResult<User>> createUser(CreateUserDto userDto)
    {
        try
        {
            var user = await _userService.CreateAsync(userDto);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while creating the user."
            );
        }
    }

}