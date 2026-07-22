import type { Metadata } from "next";
import { getGuestPageData } from "../../../lib/weddings";
import { Hero } from "@/components/sections/hero";
import { WeddingDetails } from "@/components/sections/wedding-details";
import { RsvpSection } from "@/components/sections/rsvp-section";

type PageProps = {
  params: Promise<{ guestToken: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { guestToken } = await params;
  const { wedding } = await getGuestPageData(guestToken);

  const title = `${wedding.bride_name} & ${wedding.groom_name}`;
  const description =
    "You're invited to celebrate our wedding — tap to view details and RSVP.";

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function GuestWeddingPage({ params }: PageProps) {
  const { guestToken } = await params;
  const { guest, wedding } = await getGuestPageData(guestToken);

  return (
    <main className="min-h-screen bg-background text-foreground">
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
      <RsvpSection guestName={guest.name} currentStatus={guest.rsvp_status} />
    </main>
  );
}
