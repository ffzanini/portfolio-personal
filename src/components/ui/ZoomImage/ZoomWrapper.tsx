"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./custom-zoom.css";

export function ZoomWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Zoom classDialog="custom-zoom">{children}</Zoom>;
}
