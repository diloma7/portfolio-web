"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-item", {
        scrollTrigger: {
          trigger: ".experience-item",
          start: "top 80%",
        },
        opacity: 0,
        x: -100,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 px-6 bg-slate-900/50"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-item relative ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                } md:w-1/2`}
              >
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="absolute left-0 md:left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950" />

                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Briefcase size={20} />
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                  </div>

                  <div className="text-slate-300 font-semibold mb-2">
                    {exp.company}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 mb-4">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.period}</span>
                  </div>

                  <p className="text-slate-400 mb-4">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
