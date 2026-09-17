using System.ComponentModel.DataAnnotations;

namespace RBStore.Api.DTOs;

public class UpdateCategoryDto
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
}