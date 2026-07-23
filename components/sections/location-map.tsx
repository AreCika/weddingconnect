import { Reveal } from "@/components/ui/reveal";

type LocationMapProps = {
  venueName: string | null;
  venueAddress: string | null;
};

/**
 * Purely the visual map — the venue name/address are already shown in
 * Wedding Details above. No API key needed: Google's Maps Embed works as a
 * plain query iframe for the basic (non-interactive-directions) case.
 */
export function LocationMap({ venueName, venueAddress }: LocationMapProps) {
  if (!venueName && !venueAddress) return null;

  const query = [venueName, venueAddress].filter(Boolean).join(", ");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <section className="px-6 py-16 text-center">
      <Reveal>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/20 shadow-sm">
          <iframe
            src={mapSrc}
            width="100%"
            height="360"
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map to ${venueName ?? "venue"}`}
          />
        </div>

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-primary underline-offset-4 hover:underline"
        >
          Get Directions
        </a>
      </Reveal>
    </section>
  );
}
