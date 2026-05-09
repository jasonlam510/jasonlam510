export type ResolvedTheme = "dark" | "light";
export type ThemePreference = "dark" | "light" | "system";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "dark" || value === "light" || value === "system";
}

export function getStoredThemePreference(): ThemePreference {
  const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);

  return isThemePreference(storedPreference) ? storedPreference : DEFAULT_THEME_PREFERENCE;
}

export function resolveThemePreference(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") {
    return preference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getNextExplicitTheme(
  currentTheme: ResolvedTheme,
): Exclude<ThemePreference, "system"> {
  return currentTheme === "dark" ? "light" : "dark";
}
