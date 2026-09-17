using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Repositories;

namespace RBStore.Api.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public async Task<List<Order>> GetAllAsync()
    {
        return await _orderRepository.GetAllAsync();
    }

    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _orderRepository.GetByIdAsync(id);
    }

    public async Task<Order> CreateAsync(CreateOrderDto orderDto)
    {

        if (orderDto.Items.Count == 0)
        {
            throw new ArgumentException("Order must contain at least one item.");
        }

        var items = orderDto.Items.GroupBy(item => item.ProductId).Select(group => new CreateOrderItemDto
        {
            ProductId = group.Key,
            Quantity = group.Sum(item => item.Quantity)
        }).ToList();

        var order = new Order
        {
            OrderDate = DateTime.UtcNow
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