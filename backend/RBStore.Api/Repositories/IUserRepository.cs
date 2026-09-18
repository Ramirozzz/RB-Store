using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task<User> AddAsync(User user);
}