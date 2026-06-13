import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
      setDemoMode: (mode) => set({ demoMode: mode }),
    }),
    {
      name: "guillotine-store",
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen, demoMode: state.demoMode }),
    }
  )
);
