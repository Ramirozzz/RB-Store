import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (product: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
    },
  ),
);

export default useCartStore;
