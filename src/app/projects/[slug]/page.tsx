"use client";

import { useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";
import PageCurtain from "@/components/PageCurtain";
import { useGsapContext } from "@/hooks/useGsapContext";

const DEMO_MAP: Record<string, React.ComponentType> = {
  "real-time-chat-system": dynamic(
    () => import("@/components/demos/ChatDemo"),
    { ssr: false },
  ),
  "authentication-security-system": dynamic(
    () => import("@/components/demos/AuthFlowDiagram"),
    { ssr: false },
  ),
  "digital-identity-platform": dynamic(
    () => import("@/components/demos/QRCodeDemo"),
    { ssr: false },
  ),
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const pageRef = useRef<HTMLElement>(null);

  useGsapContext(
    pageRef,
    (reduce) => {
      if (reduce) return;

      gsap.set(
        [
          ".detail-back",
          ".detail-title",
          ".detail-description",
          ".detail-tags",
          ".detail-section",
        ],
        { autoAlpha: 0, y: 24 },
      );

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".detail-back", { autoAlpha: 1, y: 0, duration: 0.5 })
        .to(".detail-title", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(
          ".detail-description",
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .to(".detail-tags", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2");

      ScrollTrigger.batch(".detail-section", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            overwrite: "auto",
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 24,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: "auto",
          }),
      });
    },
    [project],
  );

  if (!project) return notFound();

  const DemoComponent = DEMO_MAP[project.slug];

  return (
    <section ref={pageRef} className="min-h-screen py-16 md:py-20 px-4 sm:px-6">
      <PageCurtain />

      <div className="max-w-4xl mx-auto w-full">
        {/* Back link */}
        <Link
          href="/projects"
          className="detail-back inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors mb-8 md:mb-12"
        >
          <ArrowLeft size={18} />
          <span className="text-sm md:text-base">Back to Projects</span>
        </Link>

        {/* Gradient banner */}
        <div
          className={`h-40 sm:h-48 md:h-56 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-90 mb-8 md:mb-10`}
        />

        {/* Title */}
        <h1 className="detail-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-5 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {project.title}
          </span>
        </h1>

        {/* Description */}
        <p className="detail-description text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="detail-tags flex flex-wrap gap-2.5 mb-10 md:mb-14">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-slate-800/80 rounded-full text-xs md:text-sm text-cyan-300 border border-slate-700/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Problem */}
        {project.problem && (
          <div className="detail-section mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-200">
              The Problem
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {project.problem}
            </p>
          </div>
        )}

        {/* Approach */}
        {project.approach && (
          <div className="detail-section mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-200">
              My Approach
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {project.approach}
            </p>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="detail-section mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-slate-200">
              Challenges
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-400 text-sm md:text-base"
                >
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-400"
                  />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="detail-section mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-slate-200">
              Results
            </h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-400 text-sm md:text-base"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive Demo */}
        {DemoComponent && (
          <div className="detail-section mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-slate-200">
              Interactive Demo
            </h2>
            <DemoComponent />
          </div>
        )}

        {/* Back link bottom */}
        <div className="pt-6 border-t border-slate-800/60">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm md:text-base">Back to Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
