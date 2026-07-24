"use client";

import { useState, type RefObject } from "react";

const DEFAULT_SRC = "/audio/background-music.mp3";

/**
 * Track URL, e.g. a wedding's `content.music_url`; missing file fails silently.
 * Takes the `<audio>` ref as a parameter rather than returning it, so the
 * hook's return value stays ref-free (bundling a ref into a returned object
 * makes every property on it look ref-tainted to the hooks linter).
 */
export function useMusicPlayer(
  audioRef: RefObject<HTMLAudioElement | null>,
  src: string = DEFAULT_SRC
) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  function play() {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setUnavailable(true));
  }

  function pause() {
    audioRef.current?.pause();
    setPlaying(false);
  }

  function toggle() {
    if (unavailable) return;
    if (playing) {
      pause();
    } else {
      play();
    }
  }

  return {
    src,
    playing,
    unavailable,
    play,
    toggle,
    onError: () => setUnavailable(true),
  };
}
