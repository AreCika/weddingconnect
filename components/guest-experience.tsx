"use client";

import { useRef } from "react";
import { InvitationGate } from "@/components/invitation-gate";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/audio/music-player";
import { Hero } from "@/components/sections/hero";
import { CoupleIntro } from "@/components/sections/couple-intro";
import { Gallery } from "@/components/sections/gallery";
import { WeddingDetails } from "@/components/sections/wedding-details";
import { LocationMap } from "@/components/sections/location-map";
import { Timeline } from "@/components/sections/timeline";
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
}: {
  wedding: WeddingPageData;
  wishes: Wish[];
}) {
  const musicRef = useRef<MusicPlayerHandle>(null);
  const musicUrl = getMusicUrl(wedding.content);

  return (
    <main className="relative min-h-screen bg-background font-serif text-foreground">
      <InvitationGate
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        onOpen={() => musicRef.current?.play()}
      />
      <MusicPlayer ref={musicRef} src={musicUrl} />

      <Hero
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        weddingDate={wedding.wedding_date}
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
      <RsvpSection weddingId={wedding.id} />
      <Wishes weddingId={wedding.id} wishes={wishes} />
      <Closing brideName={wedding.bride_name} groomName={wedding.groom_name} />
    </main>
  );
}
