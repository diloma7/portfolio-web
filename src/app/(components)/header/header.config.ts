// app/(components)/header/header.config.ts
import type { NavLink, SocialLink } from "./header.types";

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const socials: SocialLink[] = [
  { label: "Github", href: "https://github.com/yourname", iconName: "Github" },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/yourname",
    iconName: "Linkedin",
  },
  { label: "Mail", href: "mailto:you@example.com", iconName: "Mail" },
  {
    label: "Download CV",
    href: "/diloma-ouattara-cv.pdf",
    iconName: "FileDown",
    download: true,
  },
];
