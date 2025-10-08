"use client";

import Splash from "./Splash";
import { AnimatePresence, animate, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { SplashProgressContext } from "@/lib/splash-context";

type Props = {
  children: React.ReactNode;
  /** Minimum splash duration (ms) */
  minDuration?: number;
  /** If true, only show once per session */
  oncePerSession?: boolean;
};

export default function SplashGate({
  children,
  minDuration = 900,
  oncePerSession = true,
}: Props) {
  const [show, setShow] = useState(true);
  const progress = useMotionValue(0);

  // Gate pointer events until the splash is dismissed to avoid premature interaction.
  const pointerState: React.CSSProperties = useMemo(
    () => ({ pointerEvents: show ? "none" : "auto" }),
    [show]
  );

  useEffect(() => {
    // If we've seen the splash already this session, skip it
    if (oncePerSession && typeof window !== "undefined") {
      const seen = sessionStorage.getItem("hasSeenSplash") === "1";
      if (seen) {
        setShow(false);
        progress.set(1);
        return;
      }
    }

    // We intentionally keep the splash on-screen for a minimum duration so
    // the entrance sequence feels intentional instead of flashing by.
    const timeout = setTimeout(() => {
      setShow(false);
      if (oncePerSession && typeof window !== "undefined") {
        sessionStorage.setItem("hasSeenSplash", "1");
      }
    }, minDuration);

    return () => clearTimeout(timeout);
  }, [minDuration, oncePerSession, progress]);

  useEffect(() => {
    if (show) {
      progress.set(0);
      return;
    }

    if (progress.get() === 1) return;

    const controls = animate(progress, 1, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [progress, show]);

  return (
    <SplashProgressContext.Provider value={{ progress, isActive: show }}>
      <AnimatePresence mode="wait">
        {show && <Splash key="splash" />}
      </AnimatePresence>
      <div
        aria-hidden={show}
        data-splash-active={show ? "true" : "false"}
        style={pointerState}
      >
        {children}
      </div>
    </SplashProgressContext.Provider>
  );
}
