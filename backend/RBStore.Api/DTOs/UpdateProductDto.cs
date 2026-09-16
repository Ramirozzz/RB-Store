using System.ComponentModel.DataAnnotations;
namespace RBStore.Api.DTOs;

public class UpdateProductDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Price { get; set; }

    // [Required]
    public string ImageUrl { get; set; } = string.Empty;

    [Required]
    public int StockQuantity { get; set; }

    public bool IsBestSeller { get; set; }
}