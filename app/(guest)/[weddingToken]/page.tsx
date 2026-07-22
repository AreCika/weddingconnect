import type { Metadata } from "next";
import { getWeddingPageData } from "@/lib/weddings";
import { Hero } from "@/components/sections/hero";
import { WeddingDetails } from "@/components/sections/wedding-details";
import { RsvpSection } from "@/components/sections/rsvp-section";

type PageProps = {
  params: Promise<{ weddingToken: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { weddingToken } = await params;
  const wedding = await getWeddingPageData(weddingToken);

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
  const { weddingToken } = await params;
  const wedding = await getWeddingPageData(weddingToken);

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
      <RsvpSection weddingId={wedding.id} />
    </main>
  );
}