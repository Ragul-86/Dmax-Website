import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md transition-all duration-300 hover:border-foreground/25 active:scale-[0.94] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ y: 14, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 grid place-items-center"
          >
            <Sun className="size-4 text-foreground" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: 14, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 grid place-items-center"
          >
            <Moon className="size-4 text-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
