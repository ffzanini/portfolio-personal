import type { Metadata } from "next";

import { DEFAULT_OG_IMAGE, PERSON, SITE_URL } from "@/constants/seo";
import { type Locale, withLocalePath } from "@/libs/i18n";

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

type BuildPageMetadataArgs = {
  locale: Locale;
  /** Path without locale prefix, e.g. `/about` or `/` */
  path: string;
  title: string;
  description: string;
  openGraphType?: "website" | "profile";
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  openGraphType = "website",
}: BuildPageMetadataArgs): Metadata {
  const localizedPath = withLocalePath(locale, path);
  const url = `${SITE_URL}${localizedPath}`;
  const languages = {
    "pt-BR": `${SITE_URL}${withLocalePath("pt", path)}`,
    en: `${SITE_URL}${withLocalePath("en", path)}`,
    es: `${SITE_URL}${withLocalePath("es", path)}`,
  };

  const ogTitle = `${title} | ${PERSON.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: openGraphType,
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter(
        (value) => value !== OG_LOCALE[locale],
      ),
      images: [
        {
          url: DEFAULT_OG_IMAGE.url,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: DEFAULT_OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}
