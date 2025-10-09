import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Rocket, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MyBackgroundInfo = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-card",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="about-text">
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              I&apos;m a passionate software developer with expertise in
              building scalable web applications. With a strong foundation in
              both frontend and backend technologies, I bring ideas to life
              through clean, efficient code.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My journey in software development has equipped me with the skills
              to tackle complex challenges and deliver solutions that make a
              difference. I&apos;m constantly learning and adapting to new
              technologies to stay at the forefront of the industry.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="about-card bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <Code2 className="text-cyan-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-slate-400">
                Writing maintainable, scalable code that follows best practices
              </p>
            </div>

            <div className="about-card bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <Rocket className="text-cyan-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-slate-400">
                Efficient development process with focus on timely deployment
              </p>
            </div>

            <div className="about-card bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <Users className="text-cyan-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-slate-400">
                Strong team player with excellent communication skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBackgroundInfo;
