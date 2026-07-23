"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

type Firefly = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

/** Faint upward-drifting glow dots — same pattern as FloatingPetals, restrained for ambiance. */
export function Fireflies({ count = 10 }: { count?: number }) {
  const fireflies = useMemo<Firefly[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.round((id / count) * 100 + Math.cos(id * 11) * 6),
        size: 3 + (id % 3),
        duration: 12 + ((id * 4) % 10),
        delay: (id * 2.3) % 10,
        drift: (id % 2 === 0 ? 1 : -1) * (10 + (id % 4) * 6),
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {fireflies.map((firefly) => (
        <motion.div
          key={firefly.id}
          className="absolute rounded-full bg-primary/40 blur-[1px] shadow-[0_0_6px_1px_var(--primary)]"
          style={{
            left: `${firefly.left}%`,
            bottom: "-5%",
            width: firefly.size,
            height: firefly.size,
          }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: "-110vh",
            x: [0, firefly.drift, 0],
            opacity: [0, 1, 0.3, 1, 0],
          }}
          transition={{
            duration: firefly.duration,
            delay: firefly.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
