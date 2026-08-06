import { Maven_Pro as mavenPro } from "next/font/google";
import localFont from "next/font/local";

export const fontMavenPro = mavenPro({
  subsets: ["latin"],
  variable: "--font-mavenPro",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
  weight: ["400", "600", "700"],
});

export const fontRyanaLovely = localFont({
  src: "../../public/fonts/Ryana-Lovely.woff2",
  variable: "--font-ryanaLovely",
  display: "swap",
  preload: false,
});
