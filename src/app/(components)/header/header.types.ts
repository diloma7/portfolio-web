// app/(components)/header/header.types.ts
export type NavLink = {
  label: string;
  href: string;
};

export type SocialIconName = "Github" | "Linkedin" | "Mail";

export type SocialLink = {
  label: string;
  href: string;
  iconName: SocialIconName;
};
