"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ClientToaster = dynamic(
  () =>
    import("@/components/utils/ClientToaster/ClientToaster").then((mod) => ({
      default: mod.ClientToaster,
    })),
  { ssr: false },
);

export function LazyClientToaster() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <ClientToaster />;
}
