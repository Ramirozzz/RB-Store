import { useState } from "react";
import useCartStore from "../stores/cartStore";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import useToastStore from "../stores/ToastStore";
import LoadingSpinner from "../components/LoadingSpinners/LoadingSpinner";
import { IoIosArrowBack } from "react-icons/io";
import type { Order } from "../types/order";
import OrderSuccessModal from "../components/orders/OrderSuccessModal";

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const createOrderMutation = useCreateOrder();
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const clearCart = useCartStore((state) => state.clearCart);

  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleOrderConfirmation = () => {
    createOrderMutation.mutate(
      {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (order) => {
          clearCart();
          setCompletedOrder(order);
        },

        onError: () => {
          showToast("Could not place order.", "error");
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 mt-25">
      <div className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted font-bold">
          Checkout
        </p>

        <h1 className="text-3xl tracking-tight text-text sm:text-4xl uppercase">
          Your order
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="divide-y divide-border border-y border-border">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-5">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-24 shrink-0 object-cover bg-background"
                />

                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm text-text">{item.product.name}</h2>

                    <p className="mt-1 text-xs text-muted">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-text">
                    {(item.product.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 flex cursor-pointer items-center gap-1 py-2 text-xs uppercase tracking-wider text-muted transition-all duration-300 hover:text-text"
          >
            <IoIosArrowBack size={16} />
            Continue Shopping
          </button>
        </section>

        <aside className="h-fit border border-border bg-neutral-50 p-6">
          <h2 className="text-sm uppercase tracking-wider text-text">
            Order summary
          </h2>

          <div className="mt-6 space-y-3 border-b border-border pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-text">{subtotal.toFixed(2)} kr</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className=" text-text">Free</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted">
              Total
            </span>

            <span className="text-xl text-text">{subtotal.toFixed(2)} kr</span>
          </div>
          <button
            type="button"
            onClick={handleOrderConfirmation}
            // disabled={createOrderMutation.isPending}
            className="mt-8 flex w-full cursor-pointer items-center justify-center bg-surface py-4 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createOrderMutation.isPending ? (
              <LoadingSpinner size={18} color="#ffffff" />
            ) : (
              "Confirm Order"
            )}
          </button>
        </aside>
      </div>
      {completedOrder && (
        <OrderSuccessModal
          orderId={completedOrder.id}
          onViewOrders={() => navigate("/orders")}
          onContinueShopping={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
