import { FiX } from "react-icons/fi";
import useCartStore from "../../stores/cartStore";
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

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 z-40 bg-bg/50" />

      <aside className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-white slide-bottom">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-lg font-bold">Your Cart</h2>

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
              <p className="text-sm text-muted">Your cart is empty.</p>
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
                      <h3 className="text-sm font-semibold">
                        {item.product.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted font-medium">
                        {item.product.price} kr
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center border border-border text-sm"
                        >
                          <HiMiniMinusSmall />
                        </button>

                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>

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
            <span className="text-sm font-medium">Subtotal</span>

            <span className="text-sm font-bold">{subtotal} kr</span>
          </div>

          <button
            type="button"
            className="mt-5 w-full cursor-pointer bg-black py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartItems;
