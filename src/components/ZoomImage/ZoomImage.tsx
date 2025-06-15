"use client";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

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
        <div className="absolute inset-0 bg-gray-300/30 dark:bg-gray-700/20 animate-pulse backdrop-blur-sm rounded-md z-10 flex items-center justify-center">
          <LuLoader className="h-6 w-6 text-white dark:text-gray-200 animate-spin" />
        </div>
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
