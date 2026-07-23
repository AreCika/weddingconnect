import { CalendarHeart, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

type WeddingDetailsProps = {
  weddingDate: string;
  venueName: string | null;
  venueAddress: string | null;
};

export function WeddingDetails({
  weddingDate,
  venueName,
  venueAddress,
}: WeddingDetailsProps) {
  const formattedDate = new Date(weddingDate).toLocaleDateString("en-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mapsHref =
    venueName || venueAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [venueName, venueAddress].filter(Boolean).join(", ")
        )}`
      : null;

  return (
    <section className="relative border-y border-border bg-muted/40 px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">Wedding Details</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <Reveal index={1}>
          <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-background/70 px-6 py-8 shadow-sm transition-transform hover:-translate-y-1">
            <CalendarHeart className="size-7 text-primary" />
            <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Date
            </dt>
            <dd className="font-serif text-lg text-foreground">{formattedDate}</dd>
          </div>
        </Reveal>

        {venueName && (
          <Reveal index={2}>
            <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-background/70 px-6 py-8 shadow-sm transition-transform hover:-translate-y-1">
              <MapPin className="size-7 text-primary" />
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Venue
              </dt>
              <dd className="font-serif text-lg text-foreground">{venueName}</dd>
              {venueAddress && (
                <dd className="text-sm text-muted-foreground">{venueAddress}</dd>
              )}
              {mapsHref && (
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs font-medium uppercase tracking-wide text-primary underline-offset-4 hover:underline"
                >
                  Get Directions
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
