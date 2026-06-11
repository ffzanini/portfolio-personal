import DOMPurify from "isomorphic-dompurify";

type Props = {
  json: string;
  typeText?: "div" | "span";
  className?: string;
};

export function SanitizedText({
  json,
  typeText = "div",
  className = "",
}: Readonly<Props>) {
  const sanitizedText = DOMPurify.sanitize(json, {
    ADD_ATTR: ["target", "rel"],
  });

  if (typeText === "span") {
    return (
      <span
        className={`sanitized-json ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedText }}
      />
    );
  }

  return (
    <div
      className={`sanitized-json ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  );
}
