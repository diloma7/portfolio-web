"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send } from "lucide-react";

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
      className="fixed inset-0 z-[9999] bg-slate-950"
      style={{ opacity: 1 }}
    />
  );
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // === improved intro + scroll from earlier, unchanged except for the curtain refresh ===
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduce) {
        gsap.set([".contact-title", ".contact-form", ".contact-info-item"], {
          autoAlpha: 0,
          y: 24,
        });

        const infoInView = gsap.utils
          .toArray<HTMLElement>(".contact-info-item")
          .filter(
            (el) => el.getBoundingClientRect().top < window.innerHeight - 60
          )
          .slice(0, 2);

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".contact-title", { autoAlpha: 1, y: 0, duration: 0.7 })
          .to(".contact-form", { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.25")
          .to(
            infoInView,
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            "-=0.25"
          );
      }

      gsap.set([".contact-form", ".contact-info-item"], {
        willChange: "transform, opacity",
      });

      ScrollTrigger.batch(".contact-form", {
        start: "top 85%",
        end: "top 30%",
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          }),
        onLeaveBack: (els) =>
          gsap.to(els, {
            autoAlpha: 0,
            y: 24,
            duration: 0.45,
            ease: "power2.out",
          }),
      });

      ScrollTrigger.batch(".contact-info-item", {
        start: "top 90%",
        end: "top 30%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.1,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 24,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.08,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 md:py-20 px-4 sm:px-6"
    >
      <PageCurtain />

      <div className="max-w-6xl mx-auto w-full">
        <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <form
            onSubmit={handleSubmit}
            className="contact-form space-y-5 md:space-y-6 bg-slate-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-slate-800/70 transform-gpu"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3.5 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold transition-transform duration-300 flex items-center justify-center gap-2 transform-gpu hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-cyan-500/60 motion-reduce:transform-none"
            >
              <Send size={18} />
              <span>Send Message</span>
            </button>
          </form>

          <div className="contact-info space-y-5 md:space-y-6">
            <div className="contact-info-item bg-slate-900/70 p-5 md:p-6 rounded-xl border border-slate-800/70 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Mail className="text-cyan-400" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-slate-400 break-all">hello@example.com</p>
                </div>
              </div>
            </div>

            <div className="contact-info-item bg-slate-900/70 p-5 md:p-6 rounded-xl border border-slate-800/70 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Phone className="text-cyan-400" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="contact-info-item bg-slate-900/70 p-5 md:p-6 rounded-xl border border-slate-800/70 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <MapPin className="text-cyan-400" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-slate-400">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="contact-info-item bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-5 md:p-6 rounded-xl border border-cyan-500/20">
              <p className="text-slate-300 leading-relaxed">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 text-center text-slate-500 text-sm md:text-base">
          <p>&copy; 2025 Portfolio. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
