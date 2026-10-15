import type { Metadata, Viewport } from "next";

import {
  DEFAULT_OG_IMAGE,
  PERSON,
  SEO_KEYWORDS,
  SITE_URL,
} from "@/constants/seo";

const title = `${PERSON.name} | ${PERSON.jobTitle} | ffzanini`;
const description = PERSON.description;

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${PERSON.name}`,
  },
  description,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${PERSON.name} | Portfolio`,
    title,
    description,
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
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
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@ffzanini",
  },
  alternates: {
    canonical: `${SITE_URL}/pt`,
    languages: {
      "pt-BR": `${SITE_URL}/pt`,
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
    },
  },
  category: "technology",
  other: {
    google: "notranslate",
    "geo.region": "BR-RS",
    "geo.placename": "Pelotas",
    "geo.position": "-31.7613;-52.3371",
    ICBM: "-31.7613, -52.3371",
  },
};

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#161618" },
  ],
};
