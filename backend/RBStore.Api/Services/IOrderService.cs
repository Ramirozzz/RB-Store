using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public interface IOrderService
{
    Task<List<Order>> GetAllAsync(string userId);
    Task<Order?> GetByIdAsync(int id, string userId);
    // Task<List<Order>> GetByUserIdAsync(string userId);
    Task<Order> CreateAsync(CreateOrderDto orderDto, string userId);
}