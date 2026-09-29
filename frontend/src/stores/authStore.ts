import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuthStore;
