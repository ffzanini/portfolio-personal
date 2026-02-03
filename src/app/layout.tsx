import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import AppProvider from "@/providers/AppProvider";
import {
  ClientToaster,
  JsonLd,
  ScrollToTopButton,
  SetInitialLanguage,
} from "@/components";
import {
  SITE_URL,
  PERSON,
  SEO_KEYWORDS,
  DEFAULT_OG_IMAGE,
} from "@/constants/seo";

import { fontMavenPro } from "./fonts";
import "./globals.css";

const title = `${PERSON.name} | ${PERSON.jobTitle} | ffzanini`;
const description =
  "Felipe Frantz Zanini (ffzanini) - Software Engineer, desenvolvimento e development web. Portfolio com projetos, stack e contato. Pelotas, Brasil.";

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
  },
  category: "technology",
  other: {
    google: "notranslate",
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
      <body className={`${fontMavenPro.className} antialiased`}>
        <JsonLd />
        <AppProvider>
          <SetInitialLanguage />
          {children}
          <ClientToaster />
          <ScrollToTopButton />
        </AppProvider>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <>
            <Analytics mode="production" />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
