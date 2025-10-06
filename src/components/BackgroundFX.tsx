"use client";

import { motion } from "framer-motion";

/** Soft, colorful blobs fixed behind the whole page content. */
export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Blob A (top-left) */}
      <motion.div
        initial={{ x: -240, y: -160, opacity: 0.5, scale: 1 }}
        animate={{
          x: [-240, -120, -300, -240],
          y: [-160, -80, -200, -160],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 28,
          times: [0, 0.33, 0.66, 1],
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
        }}
        className="absolute left-[-12%] top-[-10%] h-[46vmax] w-[46vmax] blur-3xl"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(56,189,248,0.45), transparent 70%)",
        }}
      />
      {/* Blob B (top-right) */}
      <motion.div
        initial={{ x: 200, y: 60, opacity: 0.4, scale: 1 }}
        animate={{
          x: [200, 280, 140, 200],
          y: [60, 20, 120, 60],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 32,
          times: [0, 0.33, 0.66, 1],
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
        }}
        className="absolute right-[-14%] top-[4%] h-[48vmax] w-[48vmax] blur-3xl"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(168,85,247,0.45), transparent 70%)",
        }}
      />
      {/* Blob C (bottom-left) */}
      <motion.div
        initial={{ x: -40, y: 260, opacity: 0.35, scale: 1 }}
        animate={{
          x: [-40, -120, 40, -40],
          y: [260, 300, 220, 260],
          scale: [1, 1.06, 0.94, 1],
        }}
        transition={{
          duration: 34,
          times: [0, 0.33, 0.66, 1],
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
        }}
        className="absolute left-[12%] bottom-[-12%] h-[44vmax] w-[44vmax] blur-3xl"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(244,63,94,0.38), transparent 70%)",
        }}
      />
    </div>
  );
}
