import useCartStore from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CartItemsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartItems: React.FC<CartItemsProps> = ({ isOpen, onClose }) => {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-surface/50 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`slide-animation ${
          isOpen ? "slide-open" : "slide-from-right"
        } fixed top-0 right-0 z-50 h-dvh w-full max-w-md flex flex-col bg-white`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-lg">Your Cart</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer"
            aria-label="Close cart"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-base font-bold text-muted">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between px-6 border-b border-b-border pb-6 "
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-24 w-24 shrink-0 object-cover"
                    />

                    <div>
                      <h3 className="text-sm ">{item.product.name}</h3>

                      <p className="mt-1 text-sm text-muted font-bold">
                        {item.product.price.toFixed(2)} kr
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center border border-border text-sm"
                        >
                          <HiMiniMinusSmall />
                        </button>

                        <span className="text-sm">{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.product.id)}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center border border-border text-sm"
                        >
                          <IoIosAdd />
                        </button>
                      </div>

                      {/* <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="mt-2 cursor-pointer text-xs text-muted underline"
                    >
                      Remove
                    </button> */}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="mt-2 cursor-pointer text-xs text-muted underline"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-border px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-sm">Subtotal</span>

            <span className="text-sm">{subtotal.toFixed(2)} kr</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="mt-5 w-full cursor-pointer bg-black py-4 text-sm uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            Checkout
          </button>

          {/* <button
            type="button"
            onClick={handleCheckout}
            disabled={createOrderMutation.isPending}
            className="mt-5 w-full cursor-pointer bg-black py-4 text-sm uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            {createOrderMutation.isPending ? (
              <LoadingSpinner size={18} color="#ffffff" />
            ) : (
              "Checkout"
            )}
          </button> */}
        </div>
      </aside>
    </>
  );
};

export default CartItems;
