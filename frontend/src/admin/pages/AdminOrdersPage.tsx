import ErrorState from "../../components/states/ErrorState";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { useUpdateAdminOrderStatus } from "../../hooks/useUpdateAdminOrderStatus";
import type { OrderStatus } from "../../types/adminOrder";
import { statuses, getStatusStyle } from "../utils/orderstatus";
import AdminOrdersSkeleton from "../AdminSkeletons/AdminOrdersSkeleton";
import useAuthStore from "../../stores/authStore";
import LockedActions from "../components/demo/LockedActions";

const AdminOrdersPage = () => {
  const { data: orders, isLoading, isError } = useAdminOrders();
  const updateStatus = useUpdateAdminOrderStatus();

  const user = useAuthStore((state) => state.user);
  const demoUser = user?.role === "Demo";

  return (
    <section>
      <div>
        <h1 className="text-2xl ">Orders</h1>
        <p className="mt-2 text-sm text-muted">Manage your store orders.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-sm mt-6">
        <p className="text-sm text-muted p-4 ">
          Total orders: {orders?.length ?? 0}
        </p>
        {isLoading ? (
          <AdminOrdersSkeleton />
        ) : isError || !orders ? (
          <ErrorState message="Could not load orders." />
        ) : (
          <table className="w-full text-left text-sm  mt-4">
            <thead>
              <tr className="border-b border-border text-text">
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
                      {demoUser ? (
                        <LockedActions>
                          <span
                            className={`rounded-md px-3 py-1.5 text-sm ${getStatusStyle(order.status)}`}
                          >
                            {
                              statuses.find(
                                (status) => status.value === order.status,
                              )?.label
                            }
                          </span>
                        </LockedActions>
                      ) : (
                        <select
                          value={order.status}
                          disabled={updateStatus.isPending}
                          onChange={(e) =>
                            updateStatus.mutate({
                              id: order.id,
                              status: Number(e.target.value) as OrderStatus,
                            })
                          }
                          className={`cursor-pointer rounded-md border-0 px-3 py-1.5 text-sm ${getStatusStyle(order.status)}`}
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
                      )}
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
