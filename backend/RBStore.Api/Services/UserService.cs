using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _userManager.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        return await _userManager.FindByIdAsync(id);
    }

    public async Task<User> CreateAsync(CreateUserDto userDto)
    {
        var user = new User
        {
            UserName = userDto.Email,
            Email = userDto.Email,
            Name = userDto.Name
        };

        var result = await _userManager.CreateAsync(
            user,
            userDto.Password
        );

        if (!result.Succeeded)
        {
            var errors = string.Join(
                ", ",
                result.Errors.Select(error => error.Description)
            );

            throw new ArgumentException(errors);
        }

        return user;
    }
}