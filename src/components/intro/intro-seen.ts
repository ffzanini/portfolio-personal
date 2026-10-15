import { isValidLocale, type Locale } from "@/libs/i18n";

export const HERO_INTRO_SEEN_KEY = "hero-intro-seen";

export const INTRO_BUILD_ORDER = [
  "welcome",
  "name",
  "roles",
  "description",
  "meta",
  "actions",
  "portrait",
  "badges",
  "stack",
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

export function introReplayRequested() {
  return new URLSearchParams(window.location.search).get("intro") === "1";
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function readIntroSeen() {
  try {
    return localStorage.getItem(HERO_INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeIntroSeen() {
  try {
    localStorage.setItem(HERO_INTRO_SEEN_KEY, "1");
  } catch {
    // Private mode can reject storage. The intro still finishes this session.
  }
}

export function clearIntroQuery() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("intro")) return;
  url.searchParams.delete("intro");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
}
