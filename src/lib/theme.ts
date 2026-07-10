import type { ThemePreference } from "@/lib/types/userPreferences";

export function applyTheme(theme: ThemePreference): void {
  const root = document.documentElement;

  if (theme === "system") {
    root.removeAttribute("data-theme");
    root.classList.toggle(
      "dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    return;
  }

  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
}

export function watchSystemTheme(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}
