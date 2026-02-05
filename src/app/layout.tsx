import type { Metadata, Viewport } from "next";

import AppProvider from "@/providers/AppProvider";
import {
  AnalyticsWrapper,
  ClientToaster,
  JsonLd,
  ScrollToTopButton,
  SetInitialLanguage,
} from "@/components/utils";
import {
  SITE_URL,
  PERSON,
  SEO_KEYWORDS,
  DEFAULT_OG_IMAGE,
} from "@/constants/seo";

import { fontMavenPro } from "./fonts";
import "./globals.css";

const title = `${PERSON.name} | ${PERSON.jobTitle} | Desenvolvedor React & Next.js | ffzanini`;
const description =
  "Felipe Frantz Zanini (ffzanini) - Software Engineer especializado em desenvolvimento web, React, Next.js e TypeScript. Explore projetos desenvolvidos, conheça minha stack tecnológica e entre em contato. Desenvolvedor frontend e fullstack disponível para novos desafios em Pelotas, Brasil.";

export const metadata: Metadata = {
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
      en: `${SITE_URL}?lang=en`,
      es: `${SITE_URL}?lang=es`,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#161618" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" translate="no" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://resume.ffzanini.dev" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={`${fontMavenPro.className} antialiased`}>
        <JsonLd />
        <AppProvider>
          <SetInitialLanguage />
          {children}
          <ClientToaster />
          <ScrollToTopButton />
        </AppProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
