"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
};

function PetalShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c4 3 6 7 6 11a6 6 0 0 1-12 0c0-4 2-8 6-11Z"
      />
    </svg>
  );
}

/**
 * Slow-falling hibiscus/frangipani petals across the hero. Count is kept low
 * and motion respects prefers-reduced-motion via the `motion-reduce` variant
 * fallback (framer-motion still renders end state instantly for those users).
 */
export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.round((id / count) * 100 + (Math.sin(id * 13) * 4)),
        size: 10 + ((id * 7) % 14),
        duration: 14 + ((id * 5) % 10),
        delay: (id * 1.7) % 12,
        drift: ((id % 2 === 0 ? 1 : -1) * (20 + (id % 5) * 8)),
        rotate: 90 + (id % 3) * 60,
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-5%] text-primary/25"
          style={{ left: `${petal.left}%`, width: petal.size, height: petal.size }}
          initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [0, petal.drift, 0],
            opacity: [0, 1, 1, 0],
            rotate: petal.rotate,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <PetalShape className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  );
}
