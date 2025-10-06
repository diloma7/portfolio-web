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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-3"
      >
        {/* Replace with your logo/mark if you have one */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-16 w-16 place-items-center rounded-2xl border text-lg font-bold"
        >
          D O
        </motion.div>
        <p className="text-sm text-muted-foreground">Loading portfolio…</p>
      </motion.div>
    </div>
  );
}
