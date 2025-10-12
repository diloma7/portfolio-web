"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PageCurtainProps = { duration?: number };

export default function PageCurtain({ duration = 0.35 }: PageCurtainProps) {
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
