import { useState, useEffect } from "react";
import { Theme } from "../lib/theme";

export function useTheme() {
  const theme = "dark" as const;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleTheme = () => {
    // Theme is locked to dark per brand guidelines
  };

  return { theme, toggleTheme };
}
