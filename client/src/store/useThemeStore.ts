import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light", // Default theme

      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },

      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = (localStorage.getItem("vite-ui-theme") as Theme) || "light";
          get().setTheme(storedTheme);
        }
      },
    }),
    {
      name: "theme-store", // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
