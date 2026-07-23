"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export function Countdown({ weddingDate }: { weddingDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Intentional: syncs client wall-clock time on mount, which the server
    // can't know in advance — this is the hydration-safe initial-value case.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft(weddingDate));
    const id = setInterval(() => setTimeLeft(getTimeLeft(weddingDate)), 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  // Render nothing on the server / first paint to avoid a hydration mismatch
  // between server time and client time.
  if (!timeLeft) return null;

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex w-14 flex-col items-center gap-1 rounded-xl border border-primary/20 bg-background/60 py-3 backdrop-blur-sm sm:w-16"
        >
          <span className="font-serif text-2xl font-medium text-primary tabular-nums sm:text-3xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
