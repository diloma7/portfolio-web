"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
// If you have a Container component, great; otherwise replace with a div wrapper:
import Container from "./Container";
import { nav, socials } from "@/app/(components)/header/header.config";
import SocialIcon from "@/app/(components)/header/SocialIcons";
// import ThemeToggle from "./ThemeToggle"; // optional
// NEW: import types/data/icon
// import { nav, socials } from "./header.config";
// import SocialIcon from "./SocialIcon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware: subtle shadow + denser blur after 8px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper: active if current path starts with item (so /projects/slug stays active)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all ",
        "backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 ",
        scrolled ? "shadow-sm" : "shadow-none"
      )}
      role="banner"
    >
      {/* Top accent hairline (very subtle brand hint) */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500/60 opacity-50" />

      {/* skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-primary px-3 py-2 text-primary-foreground"
      >
        Skip to content
      </a>

      <Container className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400 transition-colors" />
          </span>
          <span className="text-base md:text-lg">Diloma.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "relative text-sm text-muted-foreground hover:text-foreground transition-colors",
                isActive(n.href) && "text-foreground"
              )}
              aria-current={isActive(n.href) ? "page" : undefined}
            >
              {n.label}
              {/* animated underline */}
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-300",
                  isActive(n.href) && "scale-x-100",
                  "group-hover/link:scale-x-100" // supports future “group” wrapper, optional
                )}
              />
            </Link>
          ))}

          {/* Right cluster */}
          <div className="ml-2 flex items-center gap-5 pl-2 border-l">
            {socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded"
              >
                <SocialIcon name={s.iconName} />
              </Link>
            ))}
            {/* <ThemeToggle /> */}
            {/* Optional CTA button – uncomment if you want a “Resume” / “Hire me” */}
            <Button size="sm" className="hidden lg:inline-flex">
              Resume
            </Button>
          </div>
        </nav>

        {/* Mobile: Menu button */}
        <div className="md:hidden flex items-center">
          {/* <ThemeToggle /> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-screen max-w-[88vw] sm:max-w-[360px] p-0 flex flex-col"
            >
              <SheetHeader className="px-6 pb-1 pt-5">
                <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
                {/* Mobile header bar inside sheet */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-semibold"
                    onClick={() =>
                      document
                        .querySelector<HTMLElement>("[data-state='open']")
                        ?.click()
                    }
                  >
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                    Diloma.dev
                  </Link>
                </div>
              </SheetHeader>

              <nav className="px-6 py-4" aria-label="Mobile">
                <ul className="flex flex-col">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <SheetClose asChild>
                        <Link
                          href={n.href}
                          className={cn(
                            "block py-3.5 text-xl font-semibold tracking-tight",
                            isActive(n.href)
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          aria-current={isActive(n.href) ? "page" : undefined}
                        >
                          {n.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-4">
                  {socials.map((s) => (
                    <SheetClose asChild key={s.href}>
                      <Link
                        href={s.href}
                        aria-label={s.label}
                        target={
                          s.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          s.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted text-foreground"
                      >
                        <SocialIcon name={s.iconName} />
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>

              {/* optional footer area in sheet */}
              <div className="mt-auto px-6 pb-6 text-xs text-muted-foreground">
                © {new Date().getFullYear()} Diloma.dev
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
