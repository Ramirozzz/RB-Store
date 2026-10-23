using Microsoft.AspNetCore.Identity;
using RBStore.Api.Models;
using RBStore.Api.DTOs;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;


public class AdminService : IAdminService
{
    private readonly IAdminRepository _adminRepository;
    private readonly UserManager<User> _userManager;

    public AdminService(IAdminRepository adminRepository, UserManager<User> userManager)
    {
        _adminRepository = adminRepository;
        _userManager = userManager;
    }

    public async Task<AdminDashboardDto> GetDashboardAsync()
    {
        var totalProducts = await _adminRepository.GetTotalProductsAsync();
        var totalCategories = await _adminRepository.GetTotalCategoriesAsync();
        var totalOrders = await _adminRepository.GetTotalOrdersAsync();
        var totalCustomers = await _adminRepository.GetTotalCustomersAsync();
        var lowStockProducts = await _adminRepository.GetLowStockProductsAsync();

        return new AdminDashboardDto
        {
            TotalProducts = totalProducts,
            TotalCategories = totalCategories,
            TotalOrders = totalOrders,
            TotalCustomers = totalCustomers,
            LowStockProducts = lowStockProducts
        };
    }

    public async Task<List<AdminUserDto>> getAllUsersAsync()
    {
        var users = await _adminRepository.GetAllUsersAsync();
        var adminUsers = new List<AdminUserDto>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);

            adminUsers.Add(new AdminUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email ?? string.Empty,
                Role = roles.FirstOrDefault() ?? "User"
            });
        }

        return adminUsers;


    }
}