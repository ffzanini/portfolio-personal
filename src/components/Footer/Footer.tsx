"use client";
import { motion } from "framer-motion";

import { socials } from "@/constants/socials";
import { Tooltip } from "@/components";

export function Footer() {
  const yearNow = new Date().getFullYear();

  return (
    <motion.footer className="flex flex-col lg:flex-row justify-between items-center">
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
                  <motion.a
                    aria-label={name}
                    target="_blank"
                    href={href}
                    className="flex justify-center items-center"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
