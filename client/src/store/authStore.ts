import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) =>
        set({ accessToken: token, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "finance-tracker-auth",
    }
  )
);

export default useAuthStore;