"use client";

import { useEffect, useRef } from "react";
import { InvitationGate } from "@/components/guest/invitation-gate";
import { BottomNav } from "@/components/guest/bottom-nav";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { Hero } from "@/components/sections/hero";
import { CoupleIntro } from "@/components/sections/couple-intro";
import { Gallery } from "@/components/sections/gallery";
import { WeddingDetails } from "@/components/sections/wedding-details";
import { LocationMap } from "@/components/sections/location-map";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";
import { Gift } from "@/components/sections/gift";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { Wishes } from "@/components/sections/wishes";
import { Closing } from "@/components/sections/closing";
import type { WeddingPageData, Wish } from "@/lib/weddings";
import { readContentString } from "@/lib/content";

// Slightly longer than the curtain's own 1.5s duration, so auto-scroll
// doesn't start while the gate is still covering the page.
const GATE_ANIMATION_MS = 1600;

export function GuestExperience({
  wedding,
  wishes,
  weddingToken,
}: {
  wedding: WeddingPageData;
  wishes: Wish[];
  weddingToken: string;
}) {
  const musicUrl = readContentString(wedding.content, "music_url");
  const audioRef = useRef<HTMLAudioElement>(null);
  const music = useMusicPlayer(audioRef, musicUrl);
  const autoScroll = useAutoScroll();
  const gateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
    };
  }, []);

  function handleGateOpen() {
    music.play();
    gateTimeoutRef.current = setTimeout(autoScroll.start, GATE_ANIMATION_MS);
  }

  return (
    <main className="relative min-h-screen bg-background pb-20 font-serif text-foreground">
      <InvitationGate
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        onOpen={handleGateOpen}
      />
      <audio ref={audioRef} src={music.src} loop preload="none" onError={music.onError} />

      <Hero
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        weddingDate={wedding.wedding_date}
        weddingToken={weddingToken}
      />
      <CoupleIntro
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        content={wedding.content}
      />
      <Gallery content={wedding.content} />
      <WeddingDetails
        weddingDate={wedding.wedding_date}
        venueName={wedding.venue_name}
        venueAddress={wedding.venue_address}
      />
      <LocationMap
        venueName={wedding.venue_name}
        venueAddress={wedding.venue_address}
      />
      <Timeline content={wedding.content} />
      <Contact content={wedding.content} />
      <Gift content={wedding.content} />
      <RsvpSection weddingId={wedding.id} />
      <Wishes weddingId={wedding.id} wishes={wishes} />
      <Closing brideName={wedding.bride_name} groomName={wedding.groom_name} />

      <BottomNav
        musicPlaying={music.playing}
        musicUnavailable={music.unavailable}
        onToggleMusic={music.toggle}
      />
    </main>
  );
}
