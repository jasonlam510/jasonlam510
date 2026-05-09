import { useEffect, useState } from "react";
import {
  getStoredThemePreference,
  getNextExplicitTheme,
  resolveThemePreference,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "../config/theme";

export type { ThemePreference } from "../config/theme";

export function useThemePreference() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() =>
    getStoredThemePreference(),
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveThemePreference(getStoredThemePreference()),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme() {
      const resolvedTheme = resolveThemePreference(themePreference);
      document.documentElement.dataset.theme = resolvedTheme;
      localStorage.setItem(THEME_STORAGE_KEY, themePreference);
      setResolvedTheme(resolvedTheme);
    }

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [themePreference]);

  function toggleTheme() {
    setThemePreference((currentPreference) =>
      getNextExplicitTheme(resolveThemePreference(currentPreference)),
    );
  }

  return { resolvedTheme, setThemePreference, themePreference, toggleTheme };
}
