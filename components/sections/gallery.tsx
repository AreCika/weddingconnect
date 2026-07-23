"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

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

export function Gallery({ content }: GalleryProps) {
  const photos = readGallery(content);
  const [selected, setSelected] = useState<string | null>(null);

  if (photos.length === 0) return null;

  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">Our Moments</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((src, i) => (
          <Reveal key={src} index={i}>
            <button
              type="button"
              onClick={() => setSelected(src)}
              className="relative block aspect-square w-full overflow-hidden rounded-xl border border-primary/20"
            >
              <Image
                src={src}
                alt={`Wedding photo ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

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
              {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic
                  size is unknown here, unlike the fixed-aspect grid thumbnails */}
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
