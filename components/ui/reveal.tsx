"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "span";
};

export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      variants={VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
