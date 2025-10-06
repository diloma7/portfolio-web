import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import BackgroundFX from "@/components/BackgroundFX";
import ThreeParticlesBackground from "@/components/ThreeParticlesBackground";

export const metadata: Metadata = {
  title: {
    default: "DILOMA OUATTARA – Software Developer",
    template: "%s | DILOMA OUATTARA",
  },
  description:
    "Accessible, performant web apps with TypeScript, React, and Next.js.",
  keywords: ["Next.js", "TypeScript", "React", "Portfolio"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "DILOMA OUATTARA – Software Developer",
    description:
      "Accessible, performant web apps with TypeScript, React, and Next.js.",
    type: "website",
    locale: "en_ZA",
    url: "https://yourdomain.com",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundFX />
          <ThreeParticlesBackground />
          <main
            id="main-content"
            className="flex flex-col items-center justify-center "
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
