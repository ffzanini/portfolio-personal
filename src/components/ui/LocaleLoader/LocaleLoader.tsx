"use client";

import { LuLoader } from "react-icons/lu";

export function LocaleLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white-theme dark:bg-dark-theme"
      aria-hidden="true"
    >
      <LuLoader
        className="h-8 w-8 text-primary-600 dark:text-primary-300 animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}
