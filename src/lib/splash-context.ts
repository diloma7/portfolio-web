"use client";

import { MotionValue } from "framer-motion";
import { createContext, useContext } from "react";

type SplashContextValue = {
  /** Progress of the splash reveal from 0 (hidden) to 1 (fully revealed). */
  progress: MotionValue<number>;
  /** Whether the splash overlay is currently mounted/visible. */
  isActive: boolean;
};

export const SplashProgressContext = createContext<SplashContextValue | null>(
  null
);

export function useSplashProgress() {
  const context = useContext(SplashProgressContext);
  if (!context) {
    throw new Error(
      "useSplashProgress must be used within a SplashGate that provides context"
    );
  }
  return context;
}
