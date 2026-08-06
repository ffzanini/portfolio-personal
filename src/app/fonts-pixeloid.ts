import localFont from "next/font/local";

export const pixeloidSans = localFont({
  src: "../../public/fonts/PixeloidSans.woff2",
  variable: "--font-pixeloidsans",
  display: "swap",
  preload: false,
});

export const pixeloidSansBold = localFont({
  src: "../../public/fonts/PixeloidSans-Bold.woff2",
  variable: "--font-pixeloidsans-bold",
  display: "swap",
  preload: false,
});
