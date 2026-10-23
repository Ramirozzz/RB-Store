namespace RBStore.Api.DTOs;

public class AdminDashboardDto
{
    public int TotalProducts { get; set; }
    public int TotalCategories { get; set; }
    public int TotalOrders { get; set; }
    public int TotalCustomers { get; set; }
    public int LowStockProducts { get; set; }
}