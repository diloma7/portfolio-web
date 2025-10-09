"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Rocket, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ---------- TITLE ----------
      gsap.fromTo(
        ".about-title",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play reverse play reverse", // bidirectional
          },
        }
      );

      // ---------- WORD-BY-WORD PARAGRAPHS ----------
      if (textRef.current) {
        const paragraphs = Array.from(
          textRef.current.querySelectorAll<HTMLParagraphElement>("p")
        );

        // Wrap words once (client-side only)
        paragraphs.forEach((p) => {
          if (p.dataset.wrapped === "true") return; // idempotent
          const txt = p.textContent || "";
          const words = txt.split(/\s+/).filter(Boolean);

          // Give a perspective container to make rotateX smooth
          p.style.perspective = "800px";
          p.style.perspectiveOrigin = "50% 50%";
          p.style.transformStyle = "preserve-3d";

          p.innerHTML = words
            .map(
              (w) =>
                `<span class="word-wrap inline-block align-top overflow-hidden will-change-transform">
                   <span class="word inline-block will-change-transform">${w}&nbsp;</span>
                 </span>`
            )
            .join("");

          p.dataset.wrapped = "true";
        });

        // Batch each paragraph's words (fewer triggers)
        paragraphs.forEach((p) => {
          const wordEls = p.querySelectorAll<HTMLElement>(".word");
          gsap.set(wordEls, {
            autoAlpha: 0,
            y: 24,
            rotateX: -75,
            transformOrigin: "50% 100%",
          });

          ScrollTrigger.create({
            trigger: p,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play reverse play reverse", // bidirectional
            onEnter: () =>
              gsap.to(wordEls, {
                autoAlpha: 1,
                y: 0,
                rotateX: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.02,
                overwrite: "auto",
              }),
            onLeaveBack: () =>
              gsap.to(wordEls, {
                autoAlpha: 0,
                y: 24,
                rotateX: -75,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.015,
                overwrite: "auto",
              }),
          });
        });
      }

      // ---------- FEATURE CARDS (right column) ----------
      // Set once to avoid layout thrash
      gsap.set(".about-card", {
        autoAlpha: 0,
        y: 36,
        scale: 0.98,
        willChange: "transform, opacity",
      });

      ScrollTrigger.batch(".about-card", {
        start: "top 88%",
        end: "top 25%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.3)",
            stagger: 0.12,
            overwrite: "auto",
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 36,
            scale: 0.98,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: "auto",
          }),
      });

      // Be less twitchy on mobile resizes
      ScrollTrigger.config({ ignoreMobileResize: true });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        {/* Layout fix: better text width + consistent right column */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
          {/* TEXT: constrain width for readability */}
          <div ref={textRef} className="about-text max-w-prose">
            <p className="text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
              I&apos;m a passionate software developer with expertise in
              building scalable web applications. With a strong foundation in
              both frontend and backend technologies, I bring ideas to life
              through clean, efficient code.
            </p>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              My journey in software development has equipped me with the skills
              to tackle complex challenges and deliver solutions that make a
              difference. I&apos;m constantly learning and adapting to new
              technologies to stay at the forefront of the industry.
            </p>
          </div>

          {/* CARDS: consistent sizing & spacing */}
          <div
            className="
              grid
              gap-5 md:gap-6
              [grid-auto-rows:minmax(0,1fr)]
            "
          >
            <div className="about-card bg-slate-900/80 backdrop-blur p-5 md:p-6 rounded-2xl border border-slate-800/70 transition-transform transform-gpu hover:-translate-y-1">
              <Code2 className="text-cyan-400 mb-3 md:mb-4" size={36} />
              <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2">
                Clean Code
              </h3>
              <p className="text-slate-400 text-sm md:text-base">
                Writing maintainable, scalable code that follows best practices
              </p>
            </div>

            <div className="about-card bg-slate-900/80 backdrop-blur p-5 md:p-6 rounded-2xl border border-slate-800/70 transition-transform transform-gpu hover:-translate-y-1">
              <Rocket className="text-cyan-400 mb-3 md:mb-4" size={36} />
              <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2">
                Fast Delivery
              </h3>
              <p className="text-slate-400 text-sm md:text-base">
                Efficient development process with focus on timely deployment
              </p>
            </div>

            <div className="about-card bg-slate-900/80 backdrop-blur p-5 md:p-6 rounded-2xl border border-slate-800/70 transition-transform transform-gpu hover:-translate-y-1">
              <Users className="text-cyan-400 mb-3 md:mb-4" size={36} />
              <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2">
                Collaboration
              </h3>
              <p className="text-slate-400 text-sm md:text-base">
                Strong team player with excellent communication skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
