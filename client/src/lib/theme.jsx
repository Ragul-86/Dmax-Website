import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
const STORAGE_KEY = "dmax-theme";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  // Initial read (client-only). Default theme is Light Mode: a returning
  // visitor's saved choice (localStorage) is always respected, but a
  // first-time visitor now always lands on light, regardless of their
  // OS/browser dark-mode preference — previously this fell back to
  // `prefers-color-scheme`, so anyone with system dark mode on saw the
  // dark theme by default.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setThemeState(stored || "light");
    } catch {
      /* noop */
    }
  }, []);

  // Apply class + persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  const setTheme = (t) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used inside ThemeProvider");
  return v;
}
