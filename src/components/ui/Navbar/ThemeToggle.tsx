"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { LuMoonStar, LuSun } from "react-icons/lu";

import { useTranslation } from "@/context/internacionalization-context";

type ThemeToggleProps = {
  onAfterToggle?: () => void;
};

const THEME_VT_MS = 480;

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

export function ThemeToggle({ onAfterToggle }: Readonly<ThemeToggleProps>) {
  const { translations } = useTranslation();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "dark") : "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const runningRef = useRef(false);
  const clipAnimationRef = useRef<Animation | null>(null);

  const clearThemeTransition = useCallback(() => {
    clipAnimationRef.current?.cancel();
    clipAnimationRef.current = null;
    const root = document.documentElement;
    if (root.dataset.themeVt === "active") {
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-duration");
      root.style.removeProperty("--theme-vt-clip-from");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => clearThemeTransition, [clearThemeTransition]);

  const handleThemeToggle = useCallback(() => {
    const root = document.documentElement;
    const button = buttonRef.current;
    if (!button || runningRef.current || root.dataset.themeVt === "active") return;

    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const applyTheme = () => {
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
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const viewDocument = document as Document & {
      startViewTransition?: (update: () => void) => ViewTransition;
    };

    if (typeof viewDocument.startViewTransition !== "function" || reduced) {
      applyTheme();
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const clipFrom = `circle(0px at ${x}px ${y}px)`;
    const clipTo = `circle(${endRadius}px at ${x}px ${y}px)`;

    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-duration", `${THEME_VT_MS}ms`);
    root.style.setProperty("--theme-vt-clip-from", clipFrom);

    runningRef.current = true;
    const finish = () => {
      runningRef.current = false;
      clearThemeTransition();
    };

    const transition = viewDocument.startViewTransition(() => {
      applyTheme();
    });

    transition.finished.finally(finish).catch(() => undefined);
    transition.ready
      .then(() => {
        clipAnimationRef.current = root.animate(
          { clipPath: [clipFrom, clipTo] },
          {
            duration: THEME_VT_MS,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => undefined);
  }, [
    clearThemeTransition,
    currentTheme,
    onAfterToggle,
    setTheme,
    translations.ui.dota_hero_alt,
  ]);

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
      ref={buttonRef}
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
