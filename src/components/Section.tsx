"use client";

import { motion, useInView } from "framer-motion";
import { JSX, useRef } from "react";
import { revealVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  as = "section",
  children,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Tag = as as React.ElementType<{ className?: string }>;

  return (
    <Tag className={cn("py-2 md:py-20", className)}>
      <motion.div
        ref={ref}
        variants={revealVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
