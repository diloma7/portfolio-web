"use client";

import dynamic from "next/dynamic";

const FloatingActionButton = dynamic(
  () => import("@/components/FloatingActionButton"),
  { ssr: false },
);

export default function FloatingActionButtonWrapper() {
  return <FloatingActionButton />;
}
