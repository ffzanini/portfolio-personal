"use client";

export function LocaleLoader() {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-white-theme dark:bg-dark-theme"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="text-4xl font-semibold tracking-tight text-primary-600 dark:text-primary-300">
        2fZ
      </span>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600/20 border-t-primary-600 dark:border-primary-300/20 dark:border-t-primary-300" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
