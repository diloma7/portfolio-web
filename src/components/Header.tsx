"use client";

import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { NavLink, SocialLink } from "@/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socials: SocialLink[] = [
  { label: "Github", href: "https://github.com/yourname", iconName: "Github" },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/yourname",
    iconName: "Linkedin",
  },
  { label: "Mail", href: "mailto:you@example.com", iconName: "Mail" },
];

function SocialIcon({ name }: { name: SocialLink["iconName"] }) {
  if (name === "Github") return <Github className="h-5 w-5" />;
  if (name === "Linkedin") return <Linkedin className="h-5 w-5" />;
  return <Mail className="h-5 w-5" />;
}

/** Returns true when the media query matches (client-side only). */
function useBreakpoint(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null); // null until mounted
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function Header() {
  const pathname = usePathname();
  const isMdUp = useBreakpoint("(min-width: 768px)");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur flex items-center justify-center">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          YourName.dev
        </Link>

        {/* Render exactly ONE of the navs */}
        {isMdUp === null ? (
          // During hydration on first paint, avoid layout jump: show nothing (icons remain on the left)
          <div aria-hidden className="w-24" />
        ) : isMdUp ? (
          // Desktop nav (md and up)
          <nav className="flex items-center gap-6">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "text-sm transition-colors hover:text-blue-600",
                    active && "text-blue-600"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="ml-2 flex items-center gap-8">
              {socials.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  className="hover:text-blue-600"
                >
                  <SocialIcon name={s.iconName} />
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </nav>
        ) : (
          // Mobile nav (below md) with full-screen sheet
          <div className="flex  items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button aria-label="Open menu" variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-screen h-dvh p-0">
                {/* a11y: required DialogTitle; keep visually hidden */}
                <SheetHeader className="px-6">
                  <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
                </SheetHeader>

                <nav className="px-6">
                  <ul className="flex flex-col">
                    {nav.map((n) => (
                      <li key={n.href}>
                        <SheetClose asChild>
                          <Link
                            href={n.href}
                            className={cn(
                              "block py-4 text-2xl font-semibold tracking-tight",
                              pathname === n.href
                                ? "text-blue-600"
                                : "hover:text-blue-600"
                            )}
                            aria-current={
                              pathname === n.href ? "page" : undefined
                            }
                          >
                            {n.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-5">
                    {socials.map((s) => (
                      <SheetClose asChild key={s.href}>
                        <Link
                          href={s.href}
                          aria-label={s.label}
                          target="_blank"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted"
                        >
                          <SocialIcon name={s.iconName} />
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </Container>
    </header>
  );
}
