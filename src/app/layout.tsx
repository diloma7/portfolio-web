import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import BackgroundFX from "@/components/BackgroundFX";

export const metadata: Metadata = {
  title: {
    default: "DILOMA OUATTARA – Software Developer",
    template: "%s | DILOMA OUATTARA",
  },
  description:
    "Accessible, performant web apps built with TypeScript, React, and Next.js.",
  keywords: ["Next.js", "TypeScript", "React", "Portfolio"],
  authors: [{ name: "Diloma Ouattara" }],
  openGraph: {
    title: "DILOMA OUATTARA – Software Developer",
    description:
      "Accessible, performant web apps built with TypeScript, React, and Next.js.",
    type: "website",
    locale: "en_ZA",
    url: "https://diloma.dev",
  },
  metadataBase: new URL("https://diloma.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundFX />

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          ></a>
          <div className="relative z-10 flex min-h-screen flex-col">
            <main
              id="main-content"
              className="flex flex-col items-center justify-center "
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
