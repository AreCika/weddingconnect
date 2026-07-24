"use client";

import { useEffect, useRef } from "react";

const SCROLL_VELOCITY_PX_PER_SEC = 60;

const STOP_EVENTS = ["touchstart", "wheel", "pointerdown", "keydown"] as const;

/**
 * Gentle auto-scroll that starts once the guest calls `start()` and stops
 * permanently on the first interaction (touch, wheel, pointer, or key) or
 * once the page bottoms out. Never resumes — this is a nudge, not a
 * scroll-hijack.
 */
export function useAutoScroll() {
  const rafIdRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  function stop() {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    controllerRef.current?.abort();
    controllerRef.current = null;
  }

  function start() {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    for (const event of STOP_EVENTS) {
      window.addEventListener(event, stop, { once: true, signal: controller.signal });
    }

    let lastTimestamp: number | null = null;

    function tick(timestamp: number) {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      window.scrollBy(0, SCROLL_VELOCITY_PX_PER_SEC * deltaSeconds);

      const reachedBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

      if (reachedBottom) {
        stop();
        return;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => stop, []);

  return { start };
}
