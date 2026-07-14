import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { AnalyticsWrapper, JsonLd } from "@/components/utils";
import {
  SITE_URL,
  PERSON,
  SEO_KEYWORDS,
  DEFAULT_OG_IMAGE,
} from "@/constants/seo";
import { fontMavenPro } from "./fonts";
import "./globals.css";

const title = `${PERSON.name} | ${PERSON.jobTitle} | ffzanini`;
const description = PERSON.description;

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
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
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
    canonical: `${SITE_URL}/en`,
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
    <html lang="pt" translate="no" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://resume.ffzanini.dev" />
      </head>
      <body className={`${fontMavenPro.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <JsonLd />
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
