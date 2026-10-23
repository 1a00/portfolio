"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sem localStorage (modo privado): o tema vale só nesta página.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-input border border-line text-ink transition-colors duration-200 hover:bg-surface-2"
    >
      <SunIcon className="theme-icon-sun" />
      <MoonIcon className="theme-icon-moon" />
    </button>
  );
}
