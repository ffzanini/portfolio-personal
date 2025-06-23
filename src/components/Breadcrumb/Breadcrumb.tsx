"use client";
import { Fragment } from "react";
import Link from "next/link";

type BreadcrumbProps = {
  path: Array<{ label?: string; link?: string }>;
  dirty?: number;
};

export function Breadcrumb({ path, dirty }: Readonly<BreadcrumbProps>) {
  return (
    <div className="flex flex-row">
      {path.map(({ label, link }, index) => {
        const IS_NOT_FIRST = index !== 0;
        const IS_NOT_LAST = index !== path.length - 1;

        if (!label) return null;

        return (
          <Fragment key={label}>
            {IS_NOT_FIRST && (
              <span className="mx-2 text-base 2xl:text-lg">›</span>
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
              <span className="text-base 2xl:text-lg">{label}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
