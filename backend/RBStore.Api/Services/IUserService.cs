using RBStore.Api.DTOs;
using RBStore.Api.Models;

namespace RBStore.Api.Services;

public interface IUserService
{
    Task<List<UserResponseDto>> GetAllAsync();
    Task<UserResponseDto?> GetByIdAsync(string id);
    Task<LoginResponseDto> CreateAsync(CreateUserDto userDto);
    Task<LoginResponseDto?> LoginAsync(LoginUserDto loginDto);
}