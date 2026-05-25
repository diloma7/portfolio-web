import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack projects built with Next.js, TypeScript, and React — featuring real-time apps, AI integrations, and more.",
  openGraph: {
    title: "Projects | DILOMA OUATTARA",
    description:
      "Full-stack projects built with Next.js, TypeScript, and React — featuring real-time apps, AI integrations, and more.",
    url: "https://diloma.dev/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
