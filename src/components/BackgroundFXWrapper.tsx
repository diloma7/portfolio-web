"use client";

import dynamic from "next/dynamic";

const BackgroundFX = dynamic(() => import("@/components/BackgroundFX"), {
  ssr: false,
});

export default function BackgroundFXWrapper() {
  return <BackgroundFX />;
}
