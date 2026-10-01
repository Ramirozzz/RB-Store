import { FiCheck } from "react-icons/fi";

interface OrderSuccessModalProps {
  orderId: number;
  onViewOrders: () => void;
  onContinueShopping: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderId,
  onContinueShopping,
  onViewOrders,
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-surface/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white px-8 py-10 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <FiCheck size={40} strokeWidth={3} className="text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-text">
          Order confirmed
        </h2>
        <p className="mt-2 text-sm text-muted">
          Your order #{orderId} has been placed successfully.
        </p>
        <button
          type="button"
          onClick={onViewOrders}
          className="mt-8 w-full cursor-pointer bg-surface py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-neutral-800"
        >
          View My Orders
        </button>
        <button
          type="button"
          onClick={onContinueShopping}
          className=" border border-border py-4 w-full mt-4 cursor-pointer text-sm font-semibold uppercase tracking-wider text-muted transition-all duration-300 hover:text-text"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
