import { SITE_URL } from "@/constants/seo";

export function HreflangTags() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const languages = [
    { code: "pt", locale: "pt-BR" },
    { code: "en", locale: "en-US" },
    { code: "es", locale: "es-ES" },
  ];

  return (
    <>
      {languages.map((lang) => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.locale}
          href={`${SITE_URL}${currentPath}?lang=${lang.code}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${currentPath}?lang=pt`}
      />
    </>
  );
}
