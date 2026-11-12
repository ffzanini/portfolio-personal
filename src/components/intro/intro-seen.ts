import { isValidLocale, type Locale } from "@/libs/i18n";

export const INTRO_BUILD_ORDER = [
  "card",
  "welcome",
  "portrait",
  "name",
  "card-player",
  "roles",
  "card-class",
  "description",
  "card-subclass",
  "leisure",
  "card-inventory",
  "stack",
  "actions",
  "card-special",
] as const;

export function isIntroHomePath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  if (parts.length !== 1) return false;
  return isValidLocale(parts[0] ?? "");
}

export function introLocaleFromPath(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isValidLocale(first)) return first;
  return null;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function clearIntroQuery() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("intro")) return;
  url.searchParams.delete("intro");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
}
