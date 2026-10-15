import { socials } from "@/constants/socials";
import { Tooltip } from "@/components/ui/Tooltip";
import { fillTemplate } from "@/libs/fill-template";

const COPYRIGHT_YEAR = 2026;

type FooterProps = {
  sendEmailLabel: string;
  openTemplate: string;
};

export function Footer({
  sendEmailLabel,
  openTemplate,
}: Readonly<FooterProps>) {
  return (
    <footer className="flex flex-col items-center justify-between lg:flex-row">
      <div className="px-6 pt-6 lg:pt-0">
        <div className="flex justify-center">
          <p className="flex flex-col lg:flex-row">
            ©{COPYRIGHT_YEAR} Felipe Frantz Zanini
          </p>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="mb-6 flex justify-center">
          <div className="flex flex-row items-center gap-3">
            {socials.map(({ href, icon: Icon, name }) => {
              const tooltip =
                name === "Email"
                  ? sendEmailLabel
                  : fillTemplate(openTemplate, { name });

              return (
                <Tooltip key={href} text={tooltip} position="top">
                  <div className="footer-icon px-2">
                    <a
                      aria-label={name}
                      target="_blank"
                      href={href}
                      className="flex items-center justify-center"
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
