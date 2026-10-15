"use client";

import { useState } from "react";
import Image from "next/image";
import { BR as BRFlag, ES as ESFlag, US as USFlag } from "country-flag-icons/react/3x2";
import { LuChevronDown } from "react-icons/lu";

import { pixeloidSans, pixeloidSansBold } from "@/app/fonts-pixeloid";
import { fontMavenPro } from "@/app/fonts";
import { cn } from "@/libs/cn";
import type { Translations } from "@/locales";

const LANGUAGE_FLAGS = [
  { code: "pt", label: "Português", Flag: BRFlag },
  { code: "en", label: "English", Flag: USFlag },
  { code: "es", label: "Español", Flag: ESFlag },
] as const;

type HomeCharacterCardProps = {
  sheet: Translations["home"]["sheet"];
};

function BrownBelt({ label }: { label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="relative inline-block h-3 w-24 overflow-hidden rounded-sm bg-[#6b3a1f] ring-1 ring-black/15 dark:ring-white/20"
    >
      <span className="absolute inset-y-0 right-0 w-6 bg-[#141414]" />
      <span className="absolute inset-y-0 right-1.5 w-0.5 bg-[#f4efe6]" />
      <span className="absolute inset-y-0 right-3.5 w-0.5 bg-[#f4efe6]" />
    </span>
  );
}

export function HomeCharacterCard({ sheet }: Readonly<HomeCharacterCardProps>) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div
      data-build="card"
      className={cn(
        pixeloidSans.className,
        "relative z-0 w-full overflow-hidden rounded-2xl border border-black/10 bg-white/75 p-4 shadow-2xl backdrop-blur-sm [-webkit-font-smoothing:none] sm:p-5 dark:border-white/15 dark:bg-black/60",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 12%, transparent 34%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 12%, transparent 34%)",
        }}
      />
      <div
        data-build="portrait"
        className="relative mx-auto mb-6 aspect-square h-36 w-36 sm:h-40 sm:w-40"
      >
        <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary-400 via-primary-600 to-primary-800 opacity-80" />
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-primary-200 via-primary-600 to-primary-950 p-1 shadow-2xl">
          <Image
            src="/images/me-desenho-400.jpeg"
            alt="Felipe Frantz Zanini"
            width={200}
            height={200}
            className="h-full w-full rounded-lg object-cover"
            sizes="160px"
            priority
            fetchPriority="high"
            quality={75}
          />
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-3 border-white bg-green-500 sm:-right-2 sm:-bottom-2 sm:h-7 sm:w-7 sm:border-4 dark:border-[#161618]">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white sm:h-2.5 sm:w-2.5" />
        </div>
      </div>

      <div className="space-y-2.5 text-left">
        <div
          data-build="card-player"
          className="flex items-center justify-between gap-3 border-b border-black/10 pb-2.5 dark:border-white/10"
        >
          <p className={cn(pixeloidSansBold.className, "text-base text-primary-700 dark:text-primary-300")}>
            {sheet.player}
          </p>
          <div className="flex items-center gap-1.5" aria-label={sheet.languages}>
            {LANGUAGE_FLAGS.map(({ code, label, Flag }) => (
              <Flag key={code} className="h-4 w-auto" title={label} aria-label={label} />
            ))}
          </div>
          <p className={cn(pixeloidSansBold.className, "text-base text-primary-700 dark:text-primary-300")}>
            {sheet.level}
          </p>
        </div>
        <p data-build="card-class" className="text-base">
          <span className={cn(pixeloidSansBold.className, "text-primary-700 dark:text-primary-300")}>
            {sheet.classLabel}:
          </span>{" "}
          {sheet.className}
        </p>
        <p data-build="card-subclass" className="text-base">
          <span className={cn(pixeloidSansBold.className, "text-primary-700 dark:text-primary-300")}>
            {sheet.subclassLabel}:
          </span>{" "}
          {sheet.subclass}
        </p>

        <button
          type="button"
          data-build="card-subclass"
          className={cn(
            fontMavenPro.className,
            "mx-auto flex w-fit cursor-pointer items-center gap-1.5 text-base font-medium text-gray-600 transition-colors [-webkit-font-smoothing:antialiased] hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white",
          )}
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((open) => !open)}
        >
          {sheetOpen ? sheet.hideSheet : sheet.viewSheet}
          <LuChevronDown
            aria-hidden
            className={cn(
              "h-4 w-4 transition-transform duration-500 ease-out motion-reduce:transition-none",
              sheetOpen && "rotate-180",
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
            sheetOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            "lg:grid-rows-[1fr] lg:opacity-100",
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 pt-2.5">
              <div data-build="card-inventory">
                <p className={cn(pixeloidSansBold.className, "mb-1 text-base text-primary-700 dark:text-primary-300")}>
                  {sheet.inventory}
                </p>
                <ul>
                  {sheet.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 border-t border-black/10 py-1.5 text-base dark:border-white/10"
                    >
                      <span>{item.name}</span>
                      {item.id === "bjj" ? (
                        <BrownBelt label={item.stat} />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{item.stat}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-build="card-special">
                <p className={cn(pixeloidSansBold.className, "text-base text-primary-700 dark:text-primary-300")}>
                  {sheet.special}
                </p>
                <p className="text-base leading-snug">
                  <span className={pixeloidSansBold.className}>{sheet.specialTechnique}</span>{" "}
                  {sheet.specialMove}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
