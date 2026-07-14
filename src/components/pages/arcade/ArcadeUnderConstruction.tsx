"use client";

import { LuConstruction } from "react-icons/lu";

import { pixeloidSans, pixeloidSansBold } from "@/app/fonts";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";

export function ArcadeUnderConstruction() {
  const { translations } = useTranslation();
  const copy = translations.arcade.coming_soon;

  return (
    <div
      className={cn(
        pixeloidSans.className,
        "arcade-pixel-ui relative flex min-h-screen flex-col overflow-hidden",
        "bg-linear-to-br from-primary-200 via-white-theme to-white-theme",
        "dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <main className="relative flex flex-1 flex-col items-center justify-center px-3 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-xl text-center animate-fade-in">
          <span
            className={cn(
              pixeloidSansBold.className,
              "mb-5 inline-flex items-center gap-2 rounded-none bg-primary-600/15 px-3 py-1.5 text-xs uppercase tracking-widest text-primary-700 dark:text-primary-300",
            )}
          >
            <LuConstruction className="h-3.5 w-3.5" />
            {copy.eyebrow}
          </span>

          <h1
            className={cn(
              pixeloidSansBold.className,
              "mb-4 bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 p-3 text-4xl",
              "bg-clip-text text-transparent sm:text-5xl",
              "dark:from-primary-800 dark:via-primary-600 dark:to-primary-400",
            )}
          >
            {copy.title}
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-black/70 sm:text-lg dark:text-white/70">
            {copy.description}
          </p>
        </div>
      </main>

      <LazyFooter />
    </div>
  );
}
