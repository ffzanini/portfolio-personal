"use client";
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
  return (
    <Zoom classDialog="custom-zoom">
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        className={`${className} overflow-hidden shadow-md`}
      />
    </Zoom>
  );
}
