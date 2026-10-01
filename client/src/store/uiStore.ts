import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface UIState {
  sidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  theme: ThemeMode;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      isMobileSidebarOpen: false,
      theme: "dark", // default theme

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed: boolean) =>
        set({ sidebarCollapsed: collapsed }),

      setMobileSidebarOpen: (open: boolean) =>
        set({ isMobileSidebarOpen: open }),

      toggleMobileSidebar: () =>
        set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),

      setTheme: (theme: ThemeMode) => {
        set({ theme });
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      toggleTheme: () => {
        const nextTheme: ThemeMode = get().theme === "dark" ? "light" : "dark";
        get().setTheme(nextTheme);
      },
    }),
    {
      name: "finance-tracker-ui",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
