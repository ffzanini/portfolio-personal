import type { Metadata } from "next";
import { SITE_URL, PERSON, SEO_KEYWORDS, DEFAULT_OG_IMAGE } from "@/constants/seo";

const title = `${PERSON.name} | ${PERSON.jobTitle} | Desenvolvedor React & Next.js | ffzanini`;
const description =
  "Felipe Frantz Zanini (ffzanini) - Senior Software Engineer & Frontend Architect especializado em desenvolvimento web, React, Next.js e TypeScript. Explore projetos desenvolvidos, conheça minha stack tecnológica e entre em contato. Desenvolvedor frontend e fullstack disponível para novos desafios em Pelotas, Brasil.";

export const homeMetadata: Metadata = {
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
  icons: "/favicon.ico",
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
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
      "en": `${SITE_URL}?lang=en`,
      "es": `${SITE_URL}?lang=es`,
    },
  },
  category: "technology",
  other: {
    google: "notranslate",
    "geo.region": "BR-RS",
    "geo.placename": "Pelotas",
    "geo.position": "-31.7613;-52.3371",
    "ICBM": "-31.7613, -52.3371",
  },
};
