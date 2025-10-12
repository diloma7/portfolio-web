"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import MyBackgroundInfo from "@/components/MyInfo";
import Experience from "./Experience";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const HeroComponent = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // --- Helper: navigate to a section on this page, or go to route + hash ---
  const goToSection = (id: string, routePath: string) => {
    const onThisPage = pathname === routePath || routePath === "/";
    if (onThisPage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Navigate to route with hash; the target page should auto-scroll on mount (effect below)
    router.push(`${routePath}`);
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-social",
          {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      gsap.to(".floating-icon", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

        <div className="floating-icon absolute top-20 left-10 text-cyan-400/20">
          <Code2 size={80} />
        </div>
        <div className="floating-icon absolute bottom-40 right-20 text-blue-400/20">
          <Code2 size={60} />
        </div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="mb-6 flex justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/20">
              <Image
                src="/Ali.jpg"
                alt="Diloma Ouattara"
                fill
                sizes="(min-width: 768px) 8rem, 6rem" // md: 128px, else 96px
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              DILOMA OUATTARA
            </span>
          </h1>

          <h2 className="hero-subtitle text-3xl md:text-4xl font-semibold mb-6 text-slate-300">
            Full Stack Engineer
          </h2>

          <p className="hero-description text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Crafting elegant solutions to complex problems with modern web
            technologies
          </p>

          <div className="hero-cta flex gap-4 justify-center mb-12">
            <button
              type="button"
              onClick={() => goToSection("projects", "/projects")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
            >
              View My Work
            </button>
            <button
              type="button"
              onClick={() => goToSection("contact", "/contact")}
              className="px-8 py-4 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com"
              className="hero-social hover:text-cyan-400 transition-colors"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com"
              className="hero-social hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:hello@example.com"
              className="hero-social hover:text-cyan-400 transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>
      <MyBackgroundInfo />
      <Experience />
    </>
  );
};

export default HeroComponent;
