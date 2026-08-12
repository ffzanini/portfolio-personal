"use client";

import { LuX } from "react-icons/lu";

import { nightStalker, dawnbreaker } from "@/constants/phrases";

export async function showThemeToast(
  nextTheme: "light" | "dark",
  heroAlt: string,
) {
  const { default: toast } = await import("react-hot-toast");
  const goingToLight = nextTheme === "light";
  const pool = goingToLight ? dawnbreaker : nightStalker;
  const phrase =
    pool[crypto.getRandomValues(new Uint32Array(1))[0]! % pool.length] ??
    pool[0];
  const hero = goingToLight ? "Dawnbreaker" : "Night Stalker";
  const imageSrc = goingToLight
    ? "/images/toast/dawn.webp"
    : "/images/toast/night.webp";

  toast.custom((t) => (
    <div
      className={`${t.visible ? "toast-animate-fade-in" : "toast-animate-fade-out"} w-full shadow-lg rounded-lg flex ring-1 ring-black/10 dark:ring-white/10 overflow-hidden bg-white-theme dark:bg-dark-theme border border-gray-200/50 dark:border-gray-700/50`}
    >
      <div className="flex min-w-0 flex-1 items-start p-4">
        <div className="shrink-0 pt-0.5">
          <img
            className="rounded-sm"
            src={imageSrc}
            width={100}
            height={100}
            alt={heroAlt}
            loading="lazy"
          />
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {hero}
          </p>
          <p className="mt-1 text-base text-gray-700 dark:text-gray-300">
            {phrase}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 shrink-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
        >
          <LuX className="h-5 w-5" />
        </button>
      </div>
    </div>
  ));
}
