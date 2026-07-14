type Props = {
  json: string;
  typeText?: "div" | "span";
  className?: string;
};

const ALLOWED_TAGS = new Set(["a", "b", "strong", "em", "br"]);

function readQuotedAttr(attrs: string, name: string): string | null {
  const key = `${name}=`;
  const start = attrs.toLowerCase().indexOf(key);
  if (start < 0) return null;
  const afterKey = start + key.length;
  const quote = attrs[afterKey];
  if (quote !== '"' && quote !== "'") return null;
  const end = attrs.indexOf(quote, afterKey + 1);
  if (end < 0) return null;
  return attrs.slice(afterKey + 1, end).trim();
}

function sanitizeAnchor(attrs: string): string {
  const href = readQuotedAttr(attrs, "href");
  if (!href || (!href.startsWith("https://") && !href.startsWith("http://"))) {
    return "";
  }

  const safeHref = href.replaceAll('"', "&quot;");
  if (readQuotedAttr(attrs, "target") === "_blank") {
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">`;
  }
  return `<a href="${safeHref}">`;
}

function sanitizeOpenTag(tag: string, attrs: string): string {
  if (tag === "br") return "<br />";
  if (tag === "a") return sanitizeAnchor(attrs);
  return `<${tag}>`;
}

function sanitizeTagToken(raw: string): string {
  const isClosing = raw.startsWith("/");
  const body = isClosing ? raw.slice(1).trim() : raw;
  const spaceIdx = body.search(/\s/);
  const tag = (spaceIdx < 0 ? body : body.slice(0, spaceIdx)).toLowerCase();
  const attrs = spaceIdx < 0 ? "" : body.slice(spaceIdx + 1);

  if (!ALLOWED_TAGS.has(tag)) return "";
  if (isClosing) return `</${tag}>`;
  return sanitizeOpenTag(tag, attrs);
}

function sanitizeLocaleHtml(input: string): string {
  let output = "";
  let cursor = 0;

  while (cursor < input.length) {
    const open = input.indexOf("<", cursor);
    if (open < 0) {
      output += input.slice(cursor);
      break;
    }

    output += input.slice(cursor, open);
    const close = input.indexOf(">", open + 1);
    if (close < 0) {
      output += input.slice(open);
      break;
    }

    output += sanitizeTagToken(input.slice(open + 1, close).trim());
    cursor = close + 1;
  }

  return output;
}

export function SanitizedText({
  json,
  typeText = "div",
  className = "",
}: Readonly<Props>) {
  const sanitizedText = sanitizeLocaleHtml(json);
  const sharedProps = {
    className: `sanitized-json ${className}`,
    dangerouslySetInnerHTML: { __html: sanitizedText },
  };

  if (typeText === "span") {
    return <span {...sharedProps} />;
  }

  return <div {...sharedProps} />;
}
