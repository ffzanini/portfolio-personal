"use client";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Tooltip } from "@/components";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollY.set(0);
  }, [pathname, scrollY]);

  return (
    <motion.button
      className="fixed bottom-4 right-1 lg:bottom-20 lg:right-4 p-2 cursor-pointer"
      whileHover={{ y: -8 }}
      style={{ display: isVisible ? "block" : "none" }}
      onClick={goTop}
    >
      <Tooltip text="Back to top" position="top">
        <Image
          src="/images/point_up.svg"
          width={36}
          height={36}
          alt="point up"
          loading="lazy"
        />
      </Tooltip>
    </motion.button>
  );
}
