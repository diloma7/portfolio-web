"use client";

import { motion, useTransform } from "framer-motion";

import SplashGate from "@/components/SplashGate";
import ThreeBlob from "@/components/ThreeBlob";
import ThreeParticlesBackground from "@/components/ThreeParticlesBackground";
import { useSplashProgress } from "@/lib/splash-context";

function LandingExperience() {
  const { progress } = useSplashProgress();

  const revealOpacity = useTransform(progress, [0, 1], [0, 1]);
  const revealScale = useTransform(progress, [0, 1], [0.96, 1]);
  const revealY = useTransform(progress, [0, 1], [32, 0]);
  const revealBlur = useTransform(progress, [0, 1], ["24px", "0px"]);

  return (
    <>
      <ThreeParticlesBackground progress={progress} />
      <motion.main
        aria-label="Landing"
        className="relative z-10 grid min-h-[calc(50svh-4rem)] place-items-center items-start px-4 pt-8 md:pt-12"
        style={{
          opacity: revealOpacity,
          scale: revealScale,
          y: revealY,
          filter: revealBlur,
        }}
      >
        <ThreeBlob
          className="h-[min(78vh,900px)] w-[min(96vw,1400px)]"
          dark
          imageSrc="/earth.jpg"
          scale={0.58}
        />
      </motion.main>
    </>
  );
}

export default function HomePage() {
  return (
    <SplashGate minDuration={3000} oncePerSession={false}>
      <LandingExperience />
    </SplashGate>
  );
}
