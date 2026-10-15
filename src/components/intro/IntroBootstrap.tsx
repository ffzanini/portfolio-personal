"use client";

import { useServerInsertedHTML } from "next/navigation";

import { INTRO_BOOTSTRAP_SCRIPT } from "./intro-bootstrap";

export function IntroBootstrap() {
  useServerInsertedHTML(() => (
    <script
      id="intro-bootstrap"
      dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP_SCRIPT }}
    />
  ));

  return null;
}
