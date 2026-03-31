"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">Ops, algo deu errado</h1>
      <p className="max-w-md text-sm text-foreground/70">
        Ocorreu um erro inesperado ao carregar esta página.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-foreground/20 px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="rounded-full border border-foreground/20 px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Início
        </Link>
      </div>
    </main>
  );
}
