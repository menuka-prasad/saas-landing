"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeContextType {
  theme: Theme; // the user's choice (or 'system')
  resolvedTheme: Resolved; // the actual applied theme
  toggleTheme: () => void; // toggles light <-> dark (and saves)
  setThemeChoice: (t: Theme) => void; // explicitly set 'light'|'dark'|'system'
}

const THEME_KEY = "theme"; // stores only 'light' or 'dark' (never 'system')
const MQ = "(prefers-color-scheme: dark)";

function readSaved(): "light" | "dark" | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function readSystem(): Resolved {
  try {
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia(MQ).matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

/**
 * Apply initial resolved theme synchronously to avoid a flash or hydration mismatch.
 * This runs only on the client (guarded by typeof window).
 */
let initialTheme: Theme = "system";
let initialResolved: Resolved = "light";

if (typeof window !== "undefined") {
  try {
    const saved = readSaved();
    initialTheme = saved ?? "system";
    initialResolved = saved ?? readSystem();
    // apply class immediately
    document.documentElement.classList.toggle("dark", initialResolved === "dark");
  } catch {
    // ignore — fallbacks above handle it
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // theme: 'light' | 'dark' | 'system' (user choice or system)
  const [theme, setTheme] = useState<Theme>(() => initialTheme);

  // resolvedTheme is derived: if theme === 'system' use OS, else use theme
  const getResolved = (t: Theme): Resolved => {
    if (t === "system") return readSystem();
    return t;
  };

  // local state for resolved (keeps DOM sync and reduces repeated reads)
  const [resolvedTheme, setResolvedTheme] = useState<Resolved>(() => initialResolved);

  // whenever theme changes, persist or clear localStorage and update resolvedTheme & <html> class
  useEffect(() => {
    try {
      if (theme === "system") {
        // remove saved preference so future loads will follow OS
        localStorage.removeItem(THEME_KEY);
      } else {
        // save explicit user preference (only 'light' or 'dark')
        localStorage.setItem(THEME_KEY, theme);
      }
    } catch {
      // ignore storage errors
    }

    const newResolved = getResolved(theme);
    setResolvedTheme(newResolved);
    document.documentElement.classList.toggle("dark", newResolved === "dark");
  }, [theme]);

  // Listen to system theme changes but only act if user chose 'system'
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(MQ);

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      // only update if currently following system
      // (we re-check localStorage to be robust across tabs)
      const saved = readSaved();
      if (saved) return; // user has explicit preference -> ignore system changes

      const prefersDark = "matches" in e ? e.matches : (e as MediaQueryList).matches;
      const newResolved = prefersDark ? "dark" : "light";
      setResolvedTheme(newResolved);
      document.documentElement.classList.toggle("dark", newResolved === "dark");
    };

    // add listener
    if ("addEventListener" in mql) {
  mql.addEventListener("change", handler as EventListener);
} else {
  (mql as MediaQueryList).addListener(handler);
}

    return () => {
      if ("removeEventListener" in mql) {
    mql.removeEventListener("change", handler as EventListener);
  } else {
    (mql as MediaQueryList).removeListener(handler);
  }
    };
  }, []);

  // convenience: toggle between light <-> dark (explicit save)
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"; // if 'system', toggling goes to 'dark' -> 'light' behaviour
      // ensure we store explicit choice (handled by effect)
      return next;
    });
  };

  // explicit setter - can set 'system' to follow OS and clear saved preference
  const setThemeChoice = (t: Theme) => {
    setTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setThemeChoice }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
