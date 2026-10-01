import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/orders/OrderCard";
import OrderCardSkeleton from "../components/orders/OrderCardSkeleton";
import ErrorState from "../components/states/ErrorState";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useOrders();

  if (isError) {
    return (
      <ErrorState message="Could not load orders." className="min-h-screen" />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 mt-25">
      <div className="mb-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
          Account
        </p>

        <div className="flex items-end justify-between gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl uppercase">
            My Orders
          </h1>

          <p className="hidden text-sm text-muted sm:block">
            {orders?.length ?? 0} {orders?.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <div className="border border-border px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-text">
            You have no orders yet.
          </h2>

          <p className="mt-2 text-sm text-muted">
            Your orders will appear here after checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
