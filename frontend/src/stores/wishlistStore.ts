import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "../types/product";

interface WishlistStore {
  items: Product[];

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) =>
        set((state) => {
          const alreadyExists = state.items.some(
            (item) => item.id === product.id,
          );

          if (alreadyExists) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      //   isInWishlist: (productId) =>
      //     get().items.some((item) => item.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist",
    },
  ),
);

export default useWishlistStore;
