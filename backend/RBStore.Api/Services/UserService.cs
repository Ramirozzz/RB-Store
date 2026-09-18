using RBStore.Api.Repositories;
using RBStore.Api.DTOs;
using RBStore.Api.Models;
namespace RBStore.Api.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task<User> CreateAsync(CreateUserDto userDto)
    {
        var user = new User
        {
            Name = userDto.Name,
            Email = userDto.Email,
        };

        return await _userRepository.AddAsync(user);
    }

}