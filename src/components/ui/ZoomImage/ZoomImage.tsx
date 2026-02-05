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
  style?: React.CSSProperties;
  priority?: boolean;
}

export function ZoomImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
}: Readonly<ZoomImageProps>) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative"
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
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
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          quality={priority ? 90 : 85}
          sizes={
            priority
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          style={style}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </Zoom>
    </div>
  );
}
