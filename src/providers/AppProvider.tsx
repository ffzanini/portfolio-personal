import { ThemeProvider } from "next-themes";
import { InternacionalizationProvider } from "@/context/internacionalization-context";
import { DEFAULT_LOCALE, type Locale } from "@/libs/i18n";

export function AppProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: Readonly<{ children: React.ReactNode; initialLocale?: Locale }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <InternacionalizationProvider initialLocale={initialLocale}>
        {children}
      </InternacionalizationProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
