import ErrorState from "../../components/states/ErrorState";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { useUpdateAdminOrderStatus } from "../../hooks/useUpdateAdminOrderStatus";
import type { OrderStatus } from "../../types/adminOrder";
import AdminOrdersSkeleton from "../AdminSkeletons/AdminOrdersSkeleton";

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 0:
      return "bg-amber-100 text-amber-800";
    case 1:
      return "bg-green-100 text-green-800";
    case 2:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminOrdersPage = () => {
  const { data: orders, isLoading, isError } = useAdminOrders();
  const updateStatus = useUpdateAdminOrderStatus();

  const statuses: { value: OrderStatus; label: string }[] = [
    { value: 0 as unknown as OrderStatus, label: "Pending" },
    { value: 1 as unknown as OrderStatus, label: "Delivered" },
    { value: 2 as unknown as OrderStatus, label: "Cancelled" },
  ];

  // if (isLoading) {
  //   return <p>Loading orders...</p>;
  // }

  // if (isError) {
  //   return <ErrorState message="Could not load orders." />;
  // }

  // if (!orders?.length) {
  //   return <p>No orders found.</p>;
  // }

  return (
    <section>
      <div>
        <h1 className="text-2xl ">Orders</h1>
        <p className="mt-2 text-sm text-muted">Manage your store orders.</p>
      </div>

      <div className="overflow-x-auto bg-white mt-6">
        <p className="text-sm text-muted p-4 ">
          Total orders: {orders?.length ?? 0}
        </p>
        {isLoading ? (
          <AdminOrdersSkeleton />
        ) : isError || !orders ? (
          <ErrorState message="Could not load orders." />
        ) : (
          <table className="w-full text-left text-sm mt-4">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-15 text-center text-muted">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="p-4">#{order.id}</td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4">{order.customerEmail}</td>
                    <td className="p-4">
                      {new Date(order.orderDate).toLocaleDateString("sv-SE")}
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        disabled={updateStatus.isPending}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: order.id,
                            status: Number(e.target.value) as OrderStatus,
                          })
                        }
                        className={`cursor-pointer rounded-md border-0 px-3 py-1.5 text-sm font-medium ${getStatusStyle(order.status)}`}
                        aria-label={`Change status for order ${order.id}`}
                      >
                        {statuses.map((status) => (
                          <option
                            key={status.value}
                            value={status.value}
                            className="bg-white text-gray-900"
                          >
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">{order.totalPrice.toFixed(2)} kr</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminOrdersPage;
