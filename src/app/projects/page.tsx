"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Page Curtain (inline) ---------- */
function PageCurtain({ duration = 0.35 }: { duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      el.style.opacity = "0";
      el.style.display = "none";
      return;
    }

    gsap.set(el, { opacity: 1 });
    gsap.to(el, {
      opacity: 0,
      duration,
      ease: "power2.out",
      onComplete: () => {
        el.style.display = "none";
        // ensure ScrollTrigger positions are correct post-fade
        try {
          ScrollTrigger.refresh();
        } catch {}
      },
    });
  }, [duration]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // Solid, fast-fading curtain; tweak opacity if you want it lighter
      className="fixed inset-0 z-[9999] bg-slate-950"
      style={{ opacity: 1 }}
    />
  );
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates, team chat, and advanced analytics.",
      tech: ["TypeScript", "WebSocket", "Redis", "Docker"],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "AI Content Generator",
      description:
        "Machine learning powered content creation platform with natural language processing capabilities.",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization platform with custom metrics, reporting, and data export functionality.",
      tech: ["React", "D3.js", "GraphQL", "AWS"],
      gradient: "from-green-500 to-cyan-500",
    },
  ];

  // === your improved intro + scroll logic from earlier ===
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduce) {
        gsap.set([".projects-title", ".project-card"], { autoAlpha: 0, y: 28 });
        const visibleCards = gsap.utils
          .toArray<HTMLElement>(".project-card")
          .filter(
            (el) => el.getBoundingClientRect().top < window.innerHeight - 60
          );
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".projects-title", { autoAlpha: 1, y: 0, duration: 0.8 })
          .to(
            visibleCards,
            { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 },
            "-=0.3"
          );
      }

      gsap.set(".project-card", { willChange: "transform, opacity" });

      ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        end: "top 20%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 28,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: "auto",
          }),
      });

      ScrollTrigger.config({ ignoreMobileResize: true });
    }, sectionRef);

    const doRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", doRefresh);
    if (document.fonts?.ready) document.fonts.ready.then(doRefresh);

    return () => {
      window.removeEventListener("load", doRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 md:py-20 px-4 sm:px-6"
    >
      {/* Curtain should be present early in the tree so it paints immediately */}
      <PageCurtain />

      <div className="max-w-7xl mx-auto w-full">
        <h2 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {projects.map((project, index) => (
            <article
              key={index}
              className="project-card bg-slate-900/80 backdrop-blur rounded-2xl overflow-hidden border border-slate-800/70 transition-transform duration-300 transform-gpu hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className={`h-36 sm:h-40 md:h-48 bg-gradient-to-br ${project.gradient} opacity-90 transition-transform duration-500 group-hover:scale-105`}
                style={{ willChange: "transform" }}
              />
              <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2.5 md:mb-3 leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 md:mb-5 text-sm md:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2.5 mb-5 md:mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-800/80 rounded-full text-xs md:text-sm text-cyan-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    className="flex items-center gap-2 text-slate-300/90 hover:text-cyan-300 transition-colors"
                  >
                    <Github size={18} />
                    <span className="text-sm md:text-base">Code</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-slate-300/90 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm md:text-base">Live Demo</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
