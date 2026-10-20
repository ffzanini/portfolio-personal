"use client";

import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { LuMoonStar, LuSun } from "react-icons/lu";

import { useTranslation } from "@/context/internacionalization-context";

type ThemeToggleProps = {
  onAfterToggle?: () => void;
};

export function ThemeToggle({ onAfterToggle }: Readonly<ThemeToggleProps>) {
  const { translations } = useTranslation();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "dark") : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const root = document.documentElement;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    root.style.colorScheme = nextTheme;
    flushSync(() => {
      setTheme(nextTheme);
    });
    void import("./showThemeToast").then((mod) =>
      mod.showThemeToast(nextTheme, translations.ui.dota_hero_alt),
    );
    onAfterToggle?.();
  }, [currentTheme, onAfterToggle, setTheme, translations.ui.dota_hero_alt]);

  const label =
    currentTheme === "dark"
      ? translations.ui.switch_to_light
      : translations.ui.switch_to_dark;
  const tooltip =
    currentTheme === "dark"
      ? translations.ui.theme_to_light
      : translations.ui.theme_to_dark;

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label={label}
      title={tooltip}
      suppressHydrationWarning
      className="cursor-pointer"
    >
      {currentTheme === "dark" ? (
        <LuSun className="h-5 w-5 transition-transform hover:rotate-12" />
      ) : (
        <LuMoonStar className="h-5 w-5 transition-transform hover:rotate-12" />
      )}
    </button>
  );
}
