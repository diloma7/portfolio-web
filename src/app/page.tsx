"use client";
import dynamic from "next/dynamic";
import SplashGate from "@/components/SplashGate";
import LandingMainPage from "./about/page";
import { useSplashProgress } from "@/lib/splash-context";

const ThreeParticlesBackground = dynamic(
  () => import("@/components/ThreeParticlesBackground"),
  { ssr: false },
);

function LandingExperience() {
  const { progress } = useSplashProgress();
  return (
    <>
      <ThreeParticlesBackground progress={progress} />
    </>
  );
}

export default function HomePage() {
  return (
    <SplashGate minDuration={800} oncePerSession={true}>
      <LandingExperience />
      <LandingMainPage />
    </SplashGate>
  );
}
