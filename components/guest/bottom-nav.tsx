"use client";

import { motion } from "motion/react";
import { Phone, MapPin, Gift, Mail, Music, Volume2, VolumeX } from "lucide-react";

type BottomNavProps = {
  musicPlaying: boolean;
  musicUnavailable: boolean;
  onToggleMusic: () => void;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BottomNav({ musicPlaying, musicUnavailable, onToggleMusic }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          aria-label="Contacts"
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Phone className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => scrollToId("location")}
          aria-label="Location"
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <MapPin className="size-5" />
        </button>

        <button
          type="button"
          onClick={onToggleMusic}
          disabled={musicUnavailable}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          aria-pressed={musicPlaying}
          className="-mt-6 flex size-12 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <motion.span
            animate={musicPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              musicPlaying
                ? { repeat: Infinity, ease: "linear", duration: 6 }
                : { duration: 0.3 }
            }
            className="flex items-center justify-center"
          >
            {musicUnavailable ? (
              <VolumeX className="size-5" />
            ) : musicPlaying ? (
              <Music className="size-5" />
            ) : (
              <Volume2 className="size-5" />
            )}
          </motion.span>
        </button>

        <button
          type="button"
          onClick={() => scrollToId("gift")}
          aria-label="Gift"
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Gift className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => scrollToId("rsvp")}
          aria-label="RSVP"
          className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="size-5" />
        </button>
      </div>
    </nav>
  );
}
