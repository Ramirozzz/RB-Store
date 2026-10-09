using System.ComponentModel.DataAnnotations;

namespace RBStore.Api.DTOs;

public class CreateProductDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    // [Url]
    public string ImageUrl { get; set; } = string.Empty;

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    public bool IsBestSeller { get; set; }

    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }
}