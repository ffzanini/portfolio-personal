import type { Metadata, Viewport } from "next";
import { DocumentProviders } from "@/app/document-shell";
import { fontMavenPro } from "@/app/fonts";
import { pixeloidSansBold } from "@/app/fonts-pixeloid";
import { rootMetadata, rootViewport } from "@/app/root-metadata";
import { HtmlLang } from "@/components/intro/HtmlLang";
import { IntroBootstrap } from "@/components/intro/IntroBootstrap";
import "./globals.css";

export const metadata: Metadata = rootMetadata;
export const viewport: Viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      translate="no"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={pixeloidSansBold.variable}
    >
      <head>
        <link rel="dns-prefetch" href="https://resume.ffzanini.dev" />
      </head>
      <body
        className={`${fontMavenPro.className} antialiased`}
        suppressHydrationWarning
      >
        <IntroBootstrap />
        <HtmlLang />
        <noscript>
          <style>{`html[data-intro] [data-build]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <DocumentProviders>{children}</DocumentProviders>
      </body>
    </html>
  );
}
