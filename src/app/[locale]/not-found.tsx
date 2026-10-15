import Link from "next/link";

import { DEFAULT_LOCALE, withLocalePath } from "@/libs/i18n";
import { loadLocaleChrome } from "@/locales/load-locale";

export default async function NotFound() {
  const { ui } = await loadLocaleChrome(DEFAULT_LOCALE);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-linear-to-br from-primary-200 via-white-theme to-white-theme px-6 py-16 text-center dark:bg-linear-to-br dark:from-primary-950 dark:from-15% dark:via-dark-theme dark:via-30% dark:to-dark-theme dark:to-100%">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="max-w-md text-base text-gray-700 dark:text-gray-300">
        {ui.not_found_message}
      </p>
      <Link
        href={withLocalePath(DEFAULT_LOCALE, "/")}
        className="rounded-lg border border-black/15 px-5 py-2 text-sm transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-white/20 dark:hover:border-primary-400 dark:hover:text-primary-300"
      >
        {ui.not_found_home}
      </Link>
    </main>
  );
}
