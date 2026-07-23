"use client";

import { motion } from "motion/react";
import { ChevronDown, CalendarPlus } from "lucide-react";
import { CornerFlourish, HibiscusIcon } from "@/components/decor/ornaments";
import { FloatingPetals } from "@/components/decor/floating-petals";
import { Fireflies } from "@/components/decor/fireflies";
import { Countdown } from "@/components/shared/countdown";

type HeroProps = {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingToken: string;
};

export function Hero({ brideName, groomName, weddingDate, weddingToken }: HeroProps) {
  const formattedDate = new Date(weddingDate).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_var(--secondary)_0%,_var(--background)_65%)]" />
      <FloatingPetals />
      <Fireflies />

      <CornerFlourish className="absolute left-4 top-4 size-16 rotate-0 text-primary/50 sm:left-8 sm:top-8 sm:size-24" />
      <CornerFlourish className="absolute right-4 top-4 size-16 -scale-x-100 text-primary/50 sm:right-8 sm:top-8 sm:size-24" />
      <CornerFlourish className="absolute bottom-4 left-4 size-16 -scale-y-100 text-primary/50 sm:bottom-8 sm:left-8 sm:size-24" />
      <CornerFlourish className="absolute bottom-4 right-4 size-16 -scale-x-100 -scale-y-100 text-primary/50 sm:bottom-8 sm:right-8 sm:size-24" />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col items-center gap-3"
      >
        <HibiscusIcon className="size-8 text-primary" />
        <p className="font-serif text-sm uppercase tracking-[0.4em] text-muted-foreground">
          The Wedding Of
        </p>
      </motion.div>

      <div className="relative flex flex-col items-center gap-1 sm:flex-row sm:gap-5">
        <motion.h1
          initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="font-script text-6xl leading-tight text-primary sm:text-7xl"
        >
          {brideName}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-script text-4xl text-primary/70 sm:text-5xl"
        >
          &amp;
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="font-script text-6xl leading-tight text-primary sm:text-7xl"
        >
          {groomName}
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative font-serif text-lg tracking-wide text-foreground"
      >
        {formattedDate}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="relative"
      >
        <Countdown weddingDate={weddingDate} />
      </motion.div>

      <motion.a
        href={`/api/calendar/${weddingToken}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 font-serif text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <CalendarPlus className="size-4" />
        Save the Date
      </motion.a>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-primary/60"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
