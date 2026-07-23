"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { cn } from "@/lib/utils";

type GalleryProps = {
  content: Record<string, unknown>;
};

function readGallery(content: Record<string, unknown>): string[] {
  const gallery = content.gallery;
  if (!Array.isArray(gallery)) return [];
  return gallery.filter(
    (item): item is string => typeof item === "string" && item.length > 0
  );
}

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD = 10000;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
};

export function Gallery({ content }: GalleryProps) {
  const photos = readGallery(content);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const wasDragging = useRef(false);

  useEffect(() => {
    if (isPaused || photos.length <= 1) return;
    const id = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [index, isPaused, photos.length]);

  if (photos.length === 0) return null;

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -SWIPE_THRESHOLD) {
      setDirection(1);
      setIndex((prev) => (prev + 1) % photos.length);
    } else if (swipe > SWIPE_THRESHOLD) {
      setDirection(-1);
      setIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
    setTimeout(() => {
      wasDragging.current = false;
    }, 50);
  }

  function handleSlideClick() {
    if (wasDragging.current) return;
    setSelected(photos[index]);
  }

  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">Our Moments</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <Reveal index={1}>
        <div
          className="relative mx-auto mt-12 max-w-md"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-primary/20 shadow-sm">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 32 },
                  opacity: { duration: 0.2 },
                }}
                drag={photos.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={() => {
                  wasDragging.current = true;
                }}
                onDragEnd={handleDragEnd}
                onClick={handleSlideClick}
                className="absolute inset-0 cursor-pointer"
              >
                <Image
                  src={photos[index]}
                  alt={`Wedding photo ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="object-cover"
                  draggable={false}
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {photos.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-primary" : "w-2 bg-primary/30"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- unknown intrinsic size, unlike the fixed-aspect slide */}
              <img
                src={selected}
                alt=""
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground shadow-lg"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
