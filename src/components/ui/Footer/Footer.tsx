"use client";
import { memo } from "react";

import { socials } from "@/constants/socials";
import { Tooltip } from "@/components/ui";
import { useTranslation } from "@/context";
import { fillTemplate } from "@/libs/fill-template";

function FooterComponent() {
  const yearNow = new Date().getFullYear();
  const { translations } = useTranslation();
  const ui = translations.ui;

  return (
    <footer className="flex flex-col lg:flex-row justify-between items-center">
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
            {socials.map(({ href, icon: Icon, name }) => {
              const tooltip =
                name === "Email"
                  ? ui.footer_send_email
                  : fillTemplate(ui.footer_open, { name });

              return (
                <Tooltip key={href} text={tooltip} position="top">
                  <div className="footer-icon px-2">
                    <a
                      aria-label={name}
                      target="_blank"
                      href={href}
                      className="flex justify-center items-center"
                      rel="noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
