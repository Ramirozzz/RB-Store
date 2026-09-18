using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    private readonly IUserRepository _userRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IUserRepository userRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
    }

    public async Task<List<Order>> GetAllAsync(string userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            throw new ArgumentException("User not found.");
        }

        return await _orderRepository.GetByUserIdAsync(userId);
    }

    public async Task<Order?> GetByIdAsync(int id, string userId)
    {
        var order = await _orderRepository.GetByIdAsync(id);

        if (order is null)
        {
            return null;
        }

        if (order.UserId != userId)
        {
            return null;
        }

        return order;
    }

    // public async Task<List<Order>> GetByUserIdAsync(string userId)
    // {
    //     var user = await _userRepository.GetByIdAsync(userId);

    //     if (user is null)
    //     {
    //         throw new ArgumentException("User not found.");
    //     }

    //     return await _orderRepository.GetByUserIdAsync(userId);
    // }

    public async Task<Order> CreateAsync(CreateOrderDto orderDto, string userId)
    {

        if (orderDto.Items.Count == 0)
        {
            throw new ArgumentException("Order must contain at least one item.");
        }

        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            throw new ArgumentException("User not found.");
        }

        var items = orderDto.Items.GroupBy(item => item.ProductId).Select(group => new CreateOrderItemDto
        {
            ProductId = group.Key,
            Quantity = group.Sum(item => item.Quantity)
        }).ToList();

        var order = new Order
        {
            OrderDate = DateTime.UtcNow,
            UserId = user.Id
        };

        foreach (var itemDto in items)
        {
            var product = await _productRepository.GetByIdAsync(itemDto.ProductId);

            if (product is null)
            {
                throw new ArgumentException($"Product with id {itemDto.ProductId} not found.");
            }

            if (itemDto.Quantity > product.StockQuantity)
            {
                throw new ArgumentException($"Not enough stock for product {product.Name}.");
            }

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = itemDto.Quantity,
                Price = product.Price
            };

            order.OrderItems.Add(orderItem);
            order.TotalPrice += product.Price * itemDto.Quantity;
            product.StockQuantity -= itemDto.Quantity;
        }

        return await _orderRepository.AddAsync(order);
    }
}