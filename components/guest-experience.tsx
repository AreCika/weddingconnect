"use client";

import { useRef } from "react";
import { InvitationGate } from "@/components/invitation-gate";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/audio/music-player";
import { Hero } from "@/components/sections/hero";
import { WeddingDetails } from "@/components/sections/wedding-details";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { Closing } from "@/components/sections/closing";
import type { WeddingPageData } from "@/lib/weddings";

function getMusicUrl(content: Record<string, unknown>): string | undefined {
  const value = content.music_url;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function GuestExperience({ wedding }: { wedding: WeddingPageData }) {
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
      <WeddingDetails
        weddingDate={wedding.wedding_date}
        venueName={wedding.venue_name}
        venueAddress={wedding.venue_address}
      />
      <RsvpSection weddingId={wedding.id} />
      <Closing brideName={wedding.bride_name} groomName={wedding.groom_name} />
    </main>
  );
}
