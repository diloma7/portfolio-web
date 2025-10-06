export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  iconName: "Github" | "Linkedin" | "Mail";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  imageAlt: string;
  imageSrc?: string; // optional: could be a placeholder or remote image
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
