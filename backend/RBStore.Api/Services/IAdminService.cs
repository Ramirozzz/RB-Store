using RBStore.Api.DTOs;

namespace RBStore.Api.Services;

public interface IAdminService
{
    Task<AdminDashboardDto> GetDashboardAsync();
}