using RBStore.Api.DTOs;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;


public class AdminService : IAdminService
{
    private readonly IAdminRepository _adminRepository;

    public AdminService(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    public async Task<AdminDashboardDto> GetDashboardAsync()
    {
        var totalProducts = await _adminRepository.GetTotalProductsAsync();
        var totalOrders = await _adminRepository.GetTotalOrdersAsync();
        var totalCustomers = await _adminRepository.GetTotalCustomersAsync();
        var lowStockProducts = await _adminRepository.GetLowStockProductsAsync();

        return new AdminDashboardDto
        {
            TotalProducts = totalProducts,
            TotalOrders = totalOrders,
            TotalCustomers = totalCustomers,
            LowStockProducts = lowStockProducts
        };
    }
}