using RBStore.Api.Models;

namespace RBStore.Api.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(string id);
}