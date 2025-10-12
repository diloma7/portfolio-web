"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import PageCurtain from "@/components/PageCurtain";

// ✅ zod + react-hook-form (shadcn form)
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

gsap.registerPlugin(ScrollTrigger);

// === Validation schema (adjust copy rules as you like) ===
const ContactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please enter at least 10 characters."),
});

type ContactValues = z.infer<typeof ContactSchema>;

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // === react-hook-form setup (no visual changes) ===
  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onTouched",
  });

  // === GSAP intro + scroll (unchanged) ===
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

  // === Submit handler ===
  const onSubmit = (values: ContactValues) => {
    console.log("Form submitted:", values);
    form.reset();
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
          {/* === shadcn Form wrapper, preserves your classes === */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="contact-form space-y-5 md:space-y-6 bg-slate-900/60 backdrop-blur rounded-2xl p-5 md:p-6 border border-slate-800/70 transform-gpu"
              style={{ willChange: "transform, opacity" }}
              noValidate
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2"
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        {...field}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        {...field}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="message"
                      className="block text-sm font-semibold mb-2"
                    >
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        rows={5}
                        {...field}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500 transition-shadow resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Keep your original gradient button to preserve look */}
              <button
                type="submit"
                className="w-full px-8 py-3.5 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold transition-transform duration-300 flex items-center justify-center gap-2 transform-gpu hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-cyan-500/60 motion-reduce:transform-none"
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </Form>

          {/* Contact info column (unchanged) */}
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
                  <p className="text-slate-400">+27 76 0801489</p>
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
                  <p className="text-slate-400">
                    Ruimsig, Roodepoort, South Africa
                  </p>
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
