import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  accessToken: string | null
  setToken: (token: string) => void
  logout: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setToken: (token) =>
        set({ accessToken: token }),

      logout: () =>
        set({ accessToken: null })
    }),
    { name: "auth-storage" }
  )
)

export default useAuthStore