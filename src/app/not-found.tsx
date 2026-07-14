import Link from "next/link";
import { cookies, headers } from "next/headers";

import { resolvePreferredLocale, withLocalePath } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";

export default async function NotFound() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolvePreferredLocale({
    cookieLocale: cookieStore.get("app-language")?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
  const translations = await loadLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="max-w-md text-sm text-foreground/70">
        {translations.ui.not_found_message}
      </p>
      <Link
        href={withLocalePath(locale, "/")}
        className="rounded-full border border-foreground/20 px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
      >
        {translations.ui.not_found_home}
      </Link>
    </main>
  );
}
