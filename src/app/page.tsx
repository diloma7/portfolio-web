"use client";
import SplashGate from "@/components/SplashGate";
import LandingMainPage from "./about/page";
import { useSplashProgress } from "@/lib/splash-context";
import ThreeParticlesBackground from "@/components/ThreeParticlesBackground";

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
    <SplashGate minDuration={3000} oncePerSession={true}>
      <LandingExperience />
      <LandingMainPage />
    </SplashGate>
  );
}
