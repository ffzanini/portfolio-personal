import { NavbarChrome } from "@/components/ui/Navbar/NavbarChrome";
import { NavbarLinks } from "@/components/ui/Navbar/NavbarLinks";
import type { Locale } from "@/libs/i18n";
import type { ChromeTranslations } from "@/locales/load-locale";

type NavbarProps = {
  locale: Locale;
  chrome: ChromeTranslations;
};

export function Navbar({ locale, chrome }: Readonly<NavbarProps>) {
  return (
    <NavbarChrome
      locale={locale}
      closeMenuLabel={chrome.ui.close_menu}
      openMenuLabel={chrome.ui.open_menu}
      backHomeLabel={chrome.ui.back_home}
      desktopLinks={
        <NavbarLinks locale={locale} labels={chrome.navbar} variant="desktop" />
      }
    />
  );
}
