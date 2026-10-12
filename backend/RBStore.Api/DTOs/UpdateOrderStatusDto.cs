
using RBStore.Api.Models;

namespace RBStore.Api.DTOs;

public class UpdateOrderStatusDto
{
    public OrderStatus Status { get; set; }
}