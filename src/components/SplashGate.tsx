"use client";

import { useEffect, useState } from "react";
import Splash from "./Splash";

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

  useEffect(() => {
    // If we've seen the splash already this session, skip it
    if (oncePerSession && typeof window !== "undefined") {
      const seen = sessionStorage.getItem("hasSeenSplash") === "1";
      if (seen) {
        setShow(false);
        return;
      }
    }

    const t = setTimeout(() => {
      setShow(false);
      if (oncePerSession && typeof window !== "undefined") {
        sessionStorage.setItem("hasSeenSplash", "1");
      }
    }, minDuration);

    return () => clearTimeout(t);
  }, [minDuration, oncePerSession]);

  return (
    <>
      {show && <Splash />}
      {/* Prevent content shift while splash shows */}
      <div aria-hidden={show} className={show ? "invisible" : "visible"}>
        {children}
      </div>
    </>
  );
}
