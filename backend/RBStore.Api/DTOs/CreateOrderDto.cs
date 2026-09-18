using System.ComponentModel.DataAnnotations;

namespace RBStore.Api.DTOs;

public class CreateOrderDto
{
    [Required]
    public List<CreateOrderItemDto> Items { get; set; } = new();

    [Range(1, int.MaxValue)]
    public int UserId { get; set; }


}
public class CreateOrderItemDto
{
    [Range(1, int.MaxValue)]
    public int ProductId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}