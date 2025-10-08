"use client";

import { motion } from "framer-motion";

export default function Splash() {
  return (
    <div
      role="status"
      aria-label="Starting"
      className="fixed inset-0 z-[60] grid place-items-center bg-background"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 4, -2, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: [0.6, 0.01, -0.05, 0.95],
            }}
            className="relative grid h-20 w-20 place-items-center rounded-3xl border border-border/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent text-lg font-bold text-foreground shadow-[0_0_30px_rgba(59,130,246,0.3)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-primary/30 before:via-primary/10 before:to-transparent before:blur-2xl before:content-['']"
          >
            <motion.span
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="tracking-widest"
            >
              D O
            </motion.span>
          </motion.div>
          <motion.div
            aria-hidden
            animate={{
              opacity: [0, 0.4, 0],
              scale: [1, 1.35, 1.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 -z-20 rounded-3xl border border-primary/20"
          />
        </div>
        <p className="text-sm text-muted-foreground">Loading portfolio…</p>
      </motion.div>
    </div>
  );
}
