import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { IntroGreetings } from "@/components/intro/IntroGreetings";
import { AnalyticsWrapper } from "@/components/utils/Analytics";
import { JsonLd } from "@/components/utils/JsonLd";

type DocumentProvidersProps = {
  children: ReactNode;
};

export function DocumentProviders({ children }: Readonly<DocumentProvidersProps>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <JsonLd />
      {children}
      <IntroGreetings />
      <AnalyticsWrapper />
    </ThemeProvider>
  );
}
