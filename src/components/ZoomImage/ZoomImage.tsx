"use client";
import { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./custom-zoom.css";

interface ZoomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ZoomImage({
  src,
  alt,
  width,
  height,
  className,
}: Readonly<ZoomImageProps>) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md`}
          style={{ width, height }}
        />
      )}
      <Zoom classDialog="custom-zoom">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          className={`${className} overflow-hidden shadow-md transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={typeof window === "undefined" ? "eager" : "lazy"}
        />
      </Zoom>
    </div>
  );
}
