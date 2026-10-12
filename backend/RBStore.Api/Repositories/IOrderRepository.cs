using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public interface IOrderRepository
{
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(int id);
    Task<List<Order>> GetByUserIdAsync(string userId);
    Task<Order> AddAsync(Order order);
    Task<Order?> UpdateStatusAsync(int id, OrderStatus status);
}