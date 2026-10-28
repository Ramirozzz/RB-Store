using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UsersController : ControllerBase
{
    private readonly IUserService _userService;


    public UsersController(IUserService userService, IOrderService orderService)
    {
        _userService = userService;

    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet]
    public async Task<ActionResult<List<UserResponseDto>>> GetUsers()
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

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("me")]
    public async Task<ActionResult<UserResponseDto>> GetUser()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetByIdAsync(userId);

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


    [HttpPost]
    public async Task<ActionResult<LoginResponseDto>> CreateUser(CreateUserDto userDto)
    {
        try
        {
            var user = await _userService.CreateAsync(userDto);

            return Ok(user);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while creating account."
            );
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginUserDto loginDto)
    {
        try
        {
            var user = await _userService.LoginAsync(loginDto);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(user);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

}