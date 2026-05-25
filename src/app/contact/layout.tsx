import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Diloma Ouattara — software developer based in Roodepoort, South Africa. Available for freelance and full-time opportunities.",
  openGraph: {
    title: "Contact | DILOMA OUATTARA",
    description:
      "Get in touch with Diloma Ouattara — software developer based in Roodepoort, South Africa.",
    url: "https://diloma.dev/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
