"use client";

import { useRef } from "react";
import { InvitationGate } from "@/components/guest/invitation-gate";
import { BottomNav } from "@/components/guest/bottom-nav";
import { useMusicPlayer } from "@/components/audio/music-player";
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

function getMusicUrl(content: Record<string, unknown>): string | undefined {
  const value = content.music_url;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function GuestExperience({
  wedding,
  wishes,
  weddingToken,
}: {
  wedding: WeddingPageData;
  wishes: Wish[];
  weddingToken: string;
}) {
  const musicUrl = getMusicUrl(wedding.content);
  const audioRef = useRef<HTMLAudioElement>(null);
  const music = useMusicPlayer(audioRef, musicUrl);

  return (
    <main className="relative min-h-screen bg-background pb-20 font-serif text-foreground">
      <InvitationGate
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        onOpen={music.play}
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
