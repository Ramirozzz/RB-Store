using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
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

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet]
    public IActionResult GetAdmin()
    {
        return Ok(new
        {
            message = "Welcome to the admin area."
        });
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
}