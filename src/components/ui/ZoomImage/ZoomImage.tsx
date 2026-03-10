"use client";
import { useState, useRef, useEffect } from "react";
import { LuLoader } from "react-icons/lu";

import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

interface ZoomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
}

function ImageContent({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority,
  sizes,
  isLoaded,
  onLoad,
  onFirstClick,
}: Readonly<
  ZoomImageProps & {
    isLoaded: boolean;
    onLoad: () => void;
    onFirstClick?: () => void;
  }
>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={onLoad}
      onClick={priority ? onFirstClick : undefined}
      className={`${className} overflow-hidden shadow-md transition-opacity duration-300 ${
        priority || isLoaded ? "opacity-100" : "opacity-0"
      } ${priority && onFirstClick ? "cursor-zoom-in" : ""}`}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      quality={priority ? 90 : 85}
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      style={style}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
    />
  );
}

export function ZoomImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  sizes,
}: Readonly<ZoomImageProps>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ZoomWrapper, setZoomWrapper] = useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadZoom = () => {
    if (ZoomWrapper) return;
    import("./ZoomWrapper").then((mod) => {
      setZoomWrapper(() => mod.ZoomWrapper);
    });
  };

  useEffect(() => {
    if (priority || ZoomWrapper) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadZoom();
      },
      { rootMargin: "50px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority, ZoomWrapper]);

  const imageNode = (
    <ImageContent
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes}
      isLoaded={isLoaded}
      onLoad={() => setIsLoaded(true)}
      onFirstClick={ZoomWrapper ? undefined : loadZoom}
    />
  );

  return (
    <div
      ref={containerRef}
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
      {ZoomWrapper ? (
        <ZoomWrapper>{imageNode}</ZoomWrapper>
      ) : (
        imageNode
      )}
    </div>
  );
}
