using RBStore.Api.Models;
namespace RBStore.Api.Repositories;

public interface IProductRepository
{
    // methods
    Task<List<Product>> GetAllAsync();
}