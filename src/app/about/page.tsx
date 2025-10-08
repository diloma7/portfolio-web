"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
// import BackgroundFX from "@/components/BackgroundFX";
// import Header from "@/components/Header";

export default function About() {
  return (
    <>
      <section
        className="relative min-h-[100svh] flex items-center"
        aria-label="Hero"
      >
        {/* <BackgroundFX /> */}

        <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Software Developer
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Hi, I’m{" "}
              <motion.span
                className="bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent animate-gradient"
                whileHover={{ letterSpacing: "0.02em" }}
              >
                Diloma Ouattara
              </motion.span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
              className="mt-4 text-lg text-muted-foreground max-w-prose"
            >
              I craft inclusive, high-performing web experiences with
              TypeScript, React, and thoughtful product strategy.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link href="/projects" aria-label="View projects">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button>View Projects</Button>
                </motion.div>
              </Link>
              <Link href="/contact" aria-label="Contact me">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="secondary">Contact Me</Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 flex justify-center">
          <Link
            href="#about"
            aria-label="Scroll to next section"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 backdrop-blur-md border hover:bg-background"
          >
            <span className="text-sm">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>
      </section>
    </>
  );
}
