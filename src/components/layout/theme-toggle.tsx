"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const storageKey = "lh-theme";
const changeEvent = "lh-theme-change";

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncPreference = () => {
    let preference: string | null = null;
    try {
      preference = localStorage.getItem(storageKey);
    } catch {
      // System preferences still work when browser storage is unavailable.
    }
    applyTheme(
      preference === "dark" || (preference !== "light" && media.matches),
    );
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", syncPreference);
  media.addEventListener("change", syncPreference);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", syncPreference);
    media.removeEventListener("change", syncPreference);
  };
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    applyTheme(next);
    try {
      localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {
      // Keep the toggle usable even when the preference cannot be saved.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Moon
        className="theme-moon"
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Sun
        className="theme-sun"
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
