"use client";
import { useEffect } from "react";

interface PreloadImageProps {
  src: string;
  priority?: boolean;
}

export function PreloadImage({ src, priority = false }: PreloadImageProps) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    if (priority) {
      link.setAttribute("fetchpriority", "high");
    }
    document.head.appendChild(link);

    return () => {
      const existingLink = document.querySelector(`link[href="${src}"]`);
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, [src, priority]);

  return null;
}
