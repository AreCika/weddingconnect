"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export type MusicPlayerHandle = {
  /** Attempts to start playback; safe to call from a user-gesture handler. */
  play: () => void;
};

type MusicPlayerProps = {
  /** Track URL, e.g. a wedding's `content.music_url`; missing file fails silently. */
  src?: string;
};

/** Floating music toggle. play() only runs from the gate's click handler — browsers block autoplay otherwise. */
export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  function MusicPlayer({ src = "/audio/background-music.mp3" }, ref) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [unavailable, setUnavailable] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setUnavailable(true));
      },
    }));

    function toggle() {
      const audio = audioRef.current;
      if (!audio || unavailable) return;
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setUnavailable(true));
      }
    }

    return (
      <>
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="none"
          onError={() => setUnavailable(true)}
        />
        <motion.button
          type="button"
          onClick={toggle}
          disabled={unavailable}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: unavailable ? 0.4 : 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ delay: 1, duration: 0.4 }}
          className={cn(
            "fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-lg backdrop-blur-sm transition-colors hover:bg-background disabled:cursor-not-allowed sm:bottom-6 sm:right-6"
          )}
        >
          <motion.span
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={
              playing
                ? { repeat: Infinity, ease: "linear", duration: 6 }
                : { duration: 0.3 }
            }
            className="flex items-center justify-center"
          >
            {unavailable ? (
              <VolumeX className="size-5" />
            ) : playing ? (
              <Music className="size-5" />
            ) : (
              <Volume2 className="size-5" />
            )}
          </motion.span>
        </motion.button>
      </>
    );
  }
);
