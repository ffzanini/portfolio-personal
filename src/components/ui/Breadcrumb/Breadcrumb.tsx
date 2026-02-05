"use client";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_URL } from "@/constants/seo";

type BreadcrumbProps = {
  path: Array<{ label?: string; link?: string }>;
  dirty?: number;
};

export function Breadcrumb({ path, dirty }: Readonly<BreadcrumbProps>) {
  const pathname = usePathname();
  const validPath = path.filter((item) => item.label);
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validPath.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.link ? `${SITE_URL}${item.link}` : `${SITE_URL}${pathname}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-row">
        {path.map(({ label, link }, index) => {
          const IS_NOT_FIRST = index !== 0;
          const IS_NOT_LAST = index !== path.length - 1;

          if (!label) return null;

          return (
            <Fragment key={label}>
              {IS_NOT_FIRST && (
                <span className="mx-2 text-base 2xl:text-lg" aria-hidden="true">›</span>
              )}

              {link && IS_NOT_LAST && !dirty ? (
                <Link
                  href={link}
                  passHref
                  className="text-base 2xl:text-lg underline hover:underline"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-base 2xl:text-lg" aria-current="page">{label}</span>
              )}
            </Fragment>
          );
        })}
      </nav>
    </>
  );
}
