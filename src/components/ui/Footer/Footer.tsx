"use client";
import { memo } from "react";
import dynamic from "next/dynamic";

import { socials } from "@/constants/socials";
import { Tooltip } from "@/components/ui";

const MotionFooter = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.footer),
  { ssr: false },
);

const MotionA = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.a),
  { ssr: false },
);

function FooterComponent() {
  const yearNow = new Date().getFullYear();

  return (
    <MotionFooter className="flex flex-col lg:flex-row justify-between items-center">
      <div className="px-6 pt-6 lg:pt-0">
        <div className="flex justify-center">
          <p className="flex flex-col lg:flex-row">
            ©{yearNow} Felipe Frantz Zanini
          </p>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="mb-6 flex justify-center">
          <div className="flex flex-row gap-3 items-center">
            {socials.map(({ href, icon: Icon, name }) => (
              <Tooltip
                key={href}
                text={`${name === "Email" ? "Send" : "Open"} ${name}`}
                position="top"
              >
                <div className="footer-icon px-2">
                  <MotionA
                    aria-label={name}
                    target="_blank"
                    href={href}
                    className="flex justify-center items-center"
                  >
                    <Icon className="h-5 w-5" />
                  </MotionA>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </MotionFooter>
  );
}

export const Footer = memo(FooterComponent);
