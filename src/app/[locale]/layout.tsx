import { notFound } from "next/navigation";
import type { Locale } from "@/libs/i18n";
import { isValidLocale, SUPPORTED_LOCALES } from "@/libs/i18n";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return <>{children}</>;
}
