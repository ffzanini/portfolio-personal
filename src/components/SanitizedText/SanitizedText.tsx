import DOMPurify from "dompurify";
import { useMemo } from "react";

type Props = {
  json: string;
  typeText?: string;
  className?: string;
};

export function SanitizedText({
  json,
  typeText = "div",
  className = "",
}: Props) {
  const sanitizedText = useMemo(() => {
    return DOMPurify.sanitize(json, {
      ADD_ATTR: ["target", "rel"],
    });
  }, [json]);

  switch (typeText) {
    case "div":
      return (
        <div
          className={`sanitized-json ${className}`}
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      );
    case "span":
      return (
        <span
          className={`sanitized-json ${className}`}
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      );
  }
}
