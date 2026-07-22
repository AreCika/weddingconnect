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

  return (
    <section className="border-y border-border bg-muted/40 px-6 py-16 text-center">
      <h2 className="font-serif text-2xl text-foreground">Wedding Details</h2>
      <dl className="mx-auto mt-6 flex max-w-md flex-col gap-4">
        <div>
          <dt className="text-sm uppercase tracking-wide text-muted-foreground">
            Date
          </dt>
          <dd className="mt-1 text-lg text-foreground">{formattedDate}</dd>
        </div>
        {venueName && (
          <div>
            <dt className="text-sm uppercase tracking-wide text-muted-foreground">
              Venue
            </dt>
            <dd className="mt-1 text-lg text-foreground">{venueName}</dd>
            {venueAddress && (
              <dd className="text-sm text-muted-foreground">{venueAddress}</dd>
            )}
          </div>
        )}
      </dl>
    </section>
  );
}