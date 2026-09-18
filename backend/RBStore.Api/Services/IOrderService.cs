using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public interface IOrderService
{
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(int id);
    Task<List<Order>> GetByUserIdAsync(int userId);
    Task<Order> CreateAsync(CreateOrderDto orderDto);
}