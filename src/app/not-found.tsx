import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="max-w-md text-sm text-foreground/70">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="rounded-full border border-foreground/20 px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
      >
        Voltar para início
      </Link>
    </main>
  );
}
