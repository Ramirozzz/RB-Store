using RBStore.Api.Models;
namespace RBStore.Api.Services;

public interface IProductService
{
    Task<List<Product>> GetAllAsync();
}