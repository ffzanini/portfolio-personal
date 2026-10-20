"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { introLocaleFromPath } from "@/components/intro/intro-seen";
import { withLocalePath } from "@/libs/i18n";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Readonly<ErrorProps>) {
  const pathname = usePathname();
  const locale = introLocaleFromPath(pathname) ?? "pt";

  useEffect(() => {
    console.error(error);
    const message = error.message ?? "";
    const staleBundle =
      error.name === "ChunkLoadError" ||
      message.includes("Loading chunk") ||
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Importing a module script failed");
    if (!staleBundle) return;

    const key = "chunk-reload";
    if (sessionStorage.getItem(key) === pathname) return;
    sessionStorage.setItem(key, pathname);
    window.location.reload();
  }, [error, pathname]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-linear-to-br from-primary-200 via-white-theme to-white-theme px-6 py-16 text-center dark:bg-linear-to-br dark:from-primary-950 dark:from-15% dark:via-dark-theme dark:via-30% dark:to-dark-theme dark:to-100%">
      <h1 className="text-3xl font-semibold">Ops, algo deu errado</h1>
      <p className="max-w-md text-base text-gray-700 dark:text-gray-300">
        Ocorreu um erro inesperado ao carregar esta página.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-black/15 px-5 py-2 text-sm transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-white/20 dark:hover:border-primary-400 dark:hover:text-primary-300"
        >
          Tentar novamente
        </button>
        <Link
          href={withLocalePath(locale, "/")}
          className="rounded-lg border border-black/15 px-5 py-2 text-sm transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-white/20 dark:hover:border-primary-400 dark:hover:text-primary-300"
        >
          Início
        </Link>
      </div>
    </main>
  );
}
