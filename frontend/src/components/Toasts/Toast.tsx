import { useEffect } from "react";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import useToastStore from "../../stores/ToastStore";

const Toast = () => {
  const message = useToastStore((state) => state.message);
  const type = useToastStore((state) => state.type);
  const isVisible = useToastStore((state) => state.isVisible);
  const hideToast = useToastStore((state) => state.hideToast);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm border p-4 shadow-lg ${
        type === "success"
          ? "border-[#f0fdf4] bg-[#f0fdf4]"
          : "border-red-200 bg-[#e8a6a9]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="mt-0.5 shrink-0">
          {type === "success" ? (
            <FiCheck size={20} strokeWidth={3} className="text-green-600" />
          ) : (
            <FiAlertCircle size={20} className="text-text" />
          )}
        </div>

        <p className="flex-1 text-sm font-primary text-text">{message}</p>

        <button
          type="button"
          onClick={hideToast}
          className="shrink-0 cursor-pointer transition hover:text-text"
          aria-label="Close notification"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
