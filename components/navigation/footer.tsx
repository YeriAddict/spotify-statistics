import { Link } from "@nextui-org/link";

import { GithubIcon, LinkedInIcon } from "../icons/general-icons";

import { siteConfig } from "@/config/site";

export const Footer = () => {
  return (
    <>
      <footer className="bg-primary-900 h-10 flex items-center justify-center">
        <div className="flex gap-6 my-6">
          <Link isExternal aria-label="GitHub" href={siteConfig.links.github}>
            <GithubIcon className="text-foreground" />
          </Link>
          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
          >
            <LinkedInIcon className="text-foreground" />
          </Link>
        </div>
      </footer>
    </>
  );
};
