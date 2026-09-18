using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public interface IUserService
{
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task<User> CreateAsync(CreateUserDto userDto);
}