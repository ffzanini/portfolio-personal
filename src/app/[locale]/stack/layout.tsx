import type { Metadata } from "next";

import { isValidLocale, normalizeLocale } from "@/libs/i18n";
import { buildPageMetadata } from "@/libs/page-metadata";
import { loadLocale } from "@/locales/load-locale";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Readonly<LayoutProps>): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = normalizeLocale(rawLocale);
  const translations = await loadLocale(locale);

  return buildPageMetadata({
    locale,
    path: "/stack",
    title: translations.ui.seo.stack_title,
    description: translations.ui.seo.stack_description,
  });
}

export default function StackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
