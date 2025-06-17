import { ThemeProvider } from "next-themes";
import { InternacionalizationProvider } from "@/context/internacionalization-context";

export function AppProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <InternacionalizationProvider>{children}</InternacionalizationProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
