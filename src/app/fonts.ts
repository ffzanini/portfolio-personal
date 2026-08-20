import { Maven_Pro as mavenPro } from "next/font/google";

export const fontMavenPro = mavenPro({
  subsets: ["latin"],
  variable: "--font-mavenPro",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
  weight: ["400", "700"],
});
