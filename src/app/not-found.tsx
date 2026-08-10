import Link from "next/link";

import { DEFAULT_LOCALE, withLocalePath } from "@/libs/i18n";
import { loadLocaleChrome } from "@/locales/load-locale";

export default async function NotFound() {
  const { ui } = await loadLocaleChrome(DEFAULT_LOCALE);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="max-w-md text-sm text-foreground/70">
        {ui.not_found_message}
      </p>
      <Link
        href={withLocalePath(DEFAULT_LOCALE, "/")}
        className="rounded-lg border border-foreground/20 px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
      >
        {ui.not_found_home}
      </Link>
    </main>
  );
}
