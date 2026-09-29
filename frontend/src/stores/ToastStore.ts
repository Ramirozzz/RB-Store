import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastStore {
  message: string;
  type: ToastType;
  isVisible: boolean;

  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  message: "",
  type: "success",
  isVisible: false,

  showToast: (message, type) =>
    set({
      message,
      type,
      isVisible: true,
    }),

  hideToast: () =>
    set({
      isVisible: false,
    }),
}));

export default useToastStore;
