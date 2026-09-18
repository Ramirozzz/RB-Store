using Microsoft.AspNetCore.Identity;
namespace RBStore.Api.Models;

public class User : IdentityUser
{
    public string Name { get; set; } = string.Empty;

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}