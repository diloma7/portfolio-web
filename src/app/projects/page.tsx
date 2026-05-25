"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/projects";
import PageCurtain from "@/components/PageCurtain";
import Link from "next/link";
import { useGsapContext } from "@/hooks/useGsapContext";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (reduce) => {
    if (!reduce) {
      gsap.set([".projects-title", ".project-card"], { autoAlpha: 0, y: 28 });
      const visibleCards = gsap.utils
        .toArray<HTMLElement>(".project-card")
        .filter(
          (el) => el.getBoundingClientRect().top < window.innerHeight - 60,
        );
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".projects-title", { autoAlpha: 1, y: 0, duration: 0.8 })
        .to(
          visibleCards,
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 },
          "-=0.3",
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
  });

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
            <Link
              key={index}
              href={`/projects/${project.slug}`}
              className="project-card bg-slate-900/80 backdrop-blur rounded-2xl overflow-hidden border border-slate-800/70 transition-transform duration-300 transform-gpu hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none block"
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
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-800/80 rounded-full text-xs md:text-sm text-cyan-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-slate-300/90 hover:text-cyan-300 transition-colors">
                    <Github size={18} />
                    <span className="text-sm md:text-base">Code</span>
                  </span>
                  <span className="flex items-center gap-2 text-slate-300/90 hover:text-cyan-300 transition-colors">
                    <ExternalLink size={18} />
                    <span className="text-sm md:text-base">Details</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
