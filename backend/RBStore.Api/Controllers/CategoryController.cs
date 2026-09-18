using Microsoft.AspNetCore.Mvc;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
using RBStore.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace RBStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetCategories()
    {
        try
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }
        catch (Exception)
        {

            return StatusCode(500, "An unexpected error occurred while retrieving categories.");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(CreateCategoryDto categoryDto)
    {
        try
        {
            var category = await _categoryService.CreateAsync(categoryDto);

            return Ok(category);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An unexpected error occurred while creating the category."
            );
        }
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut("{id}")]
    public async Task<ActionResult<Category>> UpdateCategory(int id, UpdateCategoryDto categoryDto)
    {
        try
        {
            var category = await _categoryService.UpdateAsync(id, categoryDto);

            if (category is null)
            {
                return NotFound("Category not found.");
            }

            return Ok(category);
        }
        catch (ArgumentException ex)
        {

            return BadRequest(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred while updating the category.");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteCategory(int id)
    {
        try
        {
            var deletedCategory = await _categoryService.DeleteAsync(id);

            if (!deletedCategory)
            {
                return NotFound("Category not found");
            }

            return Ok("Category deleted successfully.");
        }
        catch (Exception)
        {

            return StatusCode(500, "An unexpected error occurred while deleting the category.");
        }
    }

}