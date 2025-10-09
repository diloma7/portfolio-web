// app/(components)/header/SocialIcon.tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialIconName } from "./header.types";

type Props = { name: SocialIconName; className?: string };

const ICONS: Record<
  SocialIconName,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Github,
  Linkedin,
  Mail,
};

export default function SocialIcon({ name, className }: Props) {
  const Icon = ICONS[name] ?? Mail;
  return <Icon className={className ?? "h-5 w-5"} />;
}
