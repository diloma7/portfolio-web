"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading development of cloud-native applications, mentoring junior developers, and architecting scalable solutions.",
      achievements: [
        "Reduced application load time by 60%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects, focusing on responsive web applications and API integrations.",
      achievements: [
        "Built 10+ production applications",
        "Improved code coverage to 85%",
        "Mentored 3 junior developers",
      ],
    },
    {
      role: "Frontend Developer",
      company: "StartUp Ventures",
      period: "2018 - 2020",
      description:
        "Created responsive user interfaces and collaborated with design team to deliver pixel-perfect implementations.",
      achievements: [
        "Redesigned company website",
        "Increased user engagement by 40%",
        "Implemented design system",
      ],
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Title (shared)
      gsap.fromTo(
        ".experience-title",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-title",
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Initial state (shared)
      gsap.set(".experience-item", {
        autoAlpha: 0,
        y: 28,
        willChange: "transform, opacity",
      });

      // Responsive animation rules
      ScrollTrigger.matchMedia({
        // Small + medium: behave like Contact (simple fade-up batch)
        "(max-width: 1023px)": function () {
          ScrollTrigger.batch(".experience-item", {
            start: "top 90%",
            end: "top 30%",
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
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
        },

        // Large and up: keep your alternating timeline, but smoother and more precise
        "(min-width: 1024px)": function () {
          // Grow the central rail
          gsap.set(".exp-rail-grow", {
            scaleY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 0%",
          });
          ScrollTrigger.create({
            trigger: ".exp-list",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            onEnter: () =>
              gsap.to(".exp-rail-grow", {
                autoAlpha: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "power2.out",
              }),
            onLeaveBack: () =>
              gsap.to(".exp-rail-grow", {
                autoAlpha: 0,
                scaleY: 0,
                duration: 0.5,
                ease: "power2.inOut",
              }),
          });

          // Alternating reveal per item (very light x drift to preserve the feel)
          const items = gsap.utils.toArray<HTMLElement>(".experience-item");
          items.forEach((item, i) => {
            const fromX = i % 2 === 0 ? -24 : 24; // subtle, not 100px
            gsap.fromTo(
              item,
              { autoAlpha: 0, y: 28, x: fromX },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: 0.65,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 88%",
                  end: "top 25%",
                  toggleActions: "play reverse play reverse",
                },
                overwrite: "auto",
              }
            );
          });

          // Marker pulse when each item enters view
          ScrollTrigger.batch(".exp-marker", {
            start: "top 88%",
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { scale: 0.9, filter: "brightness(0.9)" },
                {
                  scale: 1,
                  filter: "brightness(1)",
                  duration: 0.3,
                  ease: "power2.out",
                  stagger: 0.08,
                }
              ),
          });
        },
      });

      ScrollTrigger.config({ ignoreMobileResize: true });

      // Accuracy after fonts/assets
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      if (document.fonts?.ready) document.fonts.ready.then(refresh);

      if (reduce) ScrollTrigger.disable(false); // still allows toggling states without motion
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 md:py-20 px-4 sm:px-6 bg-slate-900/50"
    >
      <div className="max-w-5xl lg:max-w-6xl mx-auto w-full">
        <h2 className="experience-title text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="relative exp-list">
          {/* Central rail (lg+) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="h-full w-px bg-slate-800/50" />
            <div className="exp-rail-grow absolute inset-0 bg-gradient-to-b from-cyan-500/60 to-blue-500/50" />
          </div>

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => {
              const leftSide = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={[
                    "experience-item relative transform-gpu",
                    // Mobile/tablet: full width
                    "lg:w-1/2",
                    // Large screens: alternate sides
                    leftSide ? "lg:pr-10 lg:mr-auto" : "lg:pl-10 lg:ml-auto",
                  ].join(" ")}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Marker (lg+) */}
                  <div
                    className={[
                      "exp-marker hidden lg:block absolute top-7 h-3 w-3 rounded-full",
                      "bg-gradient-to-r from-cyan-400 to-blue-500",
                      "shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                      leftSide ? "right-[-7px]" : "left-[-7px]",
                    ].join(" ")}
                    aria-hidden
                  />

                  <article className="bg-slate-950/70 backdrop-blur p-5 md:p-6 rounded-2xl border border-slate-800/70 transition-transform hover:-translate-y-[2px]">
                    <header className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Briefcase size={18} />
                      <h3 className="text-lg md:text-xl font-semibold">
                        {exp.role}
                      </h3>
                    </header>

                    <div className="text-slate-300 font-medium mb-1.5">
                      {exp.company}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 mb-3">
                      <Calendar size={16} />
                      <span className="text-xs md:text-sm">{exp.period}</span>
                    </div>

                    <p className="text-slate-400 mb-4 text-sm md:text-base leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="grid gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-slate-400 text-sm md:text-[0.95rem] leading-relaxed flex gap-2"
                        >
                          <span className="text-cyan-400 mt-[2px]">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
