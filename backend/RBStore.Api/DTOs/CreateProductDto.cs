using System.ComponentModel.DataAnnotations;

namespace RBStore.Api.DTOs;

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;

    public int StockQuantity { get; set; }

    public bool IsBestSeller { get; set; }

    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }
}