namespace RBStore.Api.Repositories;

public interface IAdminRepository
{
    Task<int> GetTotalProductsAsync();
    Task<int> GetTotalOrdersAsync();
    Task<int> GetTotalCustomersAsync();
    Task<int> GetLowStockProductsAsync();
}