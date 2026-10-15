import { Footer } from "@/components/ui/Footer";
import type { Locale } from "@/libs/i18n";
import { loadLocaleChrome } from "@/locales/load-locale";

type LazyFooterProps = {
  locale: Locale;
};

export async function LazyFooter({ locale }: Readonly<LazyFooterProps>) {
  const { ui } = await loadLocaleChrome(locale);

  return (
    <Footer
      sendEmailLabel={ui.footer_send_email}
      openTemplate={ui.footer_open}
    />
  );
}
