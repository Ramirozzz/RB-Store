import { useRecentOrders } from "../../../hooks/useRecentOrders";
import { statuses, getStatusStyle } from "../../utils/orderstatus";

const RecentOrders = () => {
  const { data: recentOrders, isLoading, isError } = useRecentOrders();

  return (
    <div className="mt-8">
      <h2 className="text-lg">Recent Orders</h2>

      {isLoading ? (
        <p className="mt-4 text-sm text-muted">Loading orders...</p>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-500">
          Could not load recent orders.
        </p>
      ) : !recentOrders || recentOrders.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No orders found.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-md border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-white">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium">#{order.id}</td>

                  <td className="px-4 py-3">
                    <p>{order.customerName}</p>
                    <p className="mt-1 text-xs text-muted">
                      {order.customerEmail}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {new Date(order.orderDate).toLocaleDateString("sv-SE")}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {order.totalPrice.toLocaleString("sv-SE")} kr
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {statuses.find((status) => status.value === order.status)
                        ?.label ?? "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
