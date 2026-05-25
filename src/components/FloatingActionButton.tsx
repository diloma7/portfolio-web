"use client";

import { useEffect, useId, useRef, useState } from "react";
import { socials } from "@/app/(components)/header/header.config";
import SocialIcon from "@/app/(components)/header/SocialIcons";
import { BluetoothConnectedIcon, X } from "lucide-react";

export default function FloatingActionButton() {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsSmallScreen(mq.matches);
    setPrefersReducedMotion(mqReduced.matches);
    const handleResize = () => setIsSmallScreen(mq.matches);
    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const actions = socials;

  if (isSmallScreen) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-[1200] flex items-center justify-around gap-2 rounded-t-2xl border-t border-border bg-[#0B1220]/95 px-3 py-2 text-foreground backdrop-blur-xl md:hidden"
        aria-label="Quick links footer"
      >
        {actions.map((action) => {
          const isExternal = action.href.startsWith("http");
          return (
            <a
              key={action.href}
              href={action.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              download={action.download ? "" : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-medium text-white transition hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SocialIcon name={action.iconName} className="h-4 w-4" />
              <span className="leading-none">{action.label}</span>
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-[1200] hidden md:flex flex-col items-center gap-2.5"
      aria-live="polite"
    >
      {/* Collapsible link menu */}
      <div
        id={menuId}
        className="overflow-hidden rounded-2xl"
        style={{
          maxHeight: open ? "400px" : "0",
          transition: prefersReducedMotion ? "none" : "max-height 0.2s ease",
        }}
      >
        <nav
          className="flex flex-col items-center gap-1 rounded-2xl border border-slate-700/50 bg-[#0B1220] p-1 shadow-xl backdrop-blur-xl"
          aria-label="Quick links"
        >
          {actions.map((action) => {
            const isExternal = action.href.startsWith("http");
            return (
              <div key={action.href} className="relative group">
                <a
                  href={action.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  download={action.download ? "" : undefined}
                  onClick={handleClose}
                  aria-label={action.label}
                  className="flex items-center justify-center p-2 rounded-xl text-white transition hover:bg-slate-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
                >
                  <SocialIcon name={action.iconName} className="h-4 w-4" />
                </a>
                {/* Tooltip */}
                <span className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-700 bg-[#0b1220] px-2 py-1 text-xs text-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* FAB toggle button */}
      <div className="relative group">
        <button
          type="button"
          aria-label={open ? "Close quick links" : "Open quick links"}
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={handleToggle}
          className="h-14 w-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-xl transition hover:from-cyan-400 hover:to-blue-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/40 flex items-center justify-center"
        >
          {open ? <X size={22} /> : <BluetoothConnectedIcon size={22} />}
        </button>
        <span className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-700 bg-[#0b1220] px-2 py-1 text-xs text-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          {open ? "Hide quick links" : "Quick links"}
        </span>
      </div>
    </div>
  );
}
