import React from "react";
import type { Order } from "../../types/order";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden border border-border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center bg-surface text-white">
            <span className="text-xs font-bold">#</span>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Order
            </p>

            <h2 className="mt-0.5 text-sm font-bold text-text">{order.id}</h2>
          </div>
        </div>

        <p className="text-xs font-medium text-muted">{formattedDate}</p>
      </div>

      {/* Products */}
      <div className="divide-y divide-border">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex gap-4 px-5 py-5 sm:px-6">
            <div className="h-24 w-24 shrink-0 overflow-hidden bg-background sm:h-28 sm:w-28">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-text">
                  {item.product.name}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {item.product.category.name}
                </p>

                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span>Qty {item.quantity}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span>{item.price} kr each</span>
                </div>
              </div>

              <p className="shrink-0 text-sm font-semibold text-text">
                {(item.price * item.quantity).toFixed(2)} kr
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-neutral-50 px-5 py-6 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Order total
          </p>
        </div>

        <p className="text-xl font-bold tracking-tight text-text">
          {order.totalPrice.toFixed(2)} kr
        </p>
      </div>
    </article>
  );
};

export default OrderCard;
