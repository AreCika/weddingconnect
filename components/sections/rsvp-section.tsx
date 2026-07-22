import { Button } from "@/components/ui/button";

type RsvpSectionProps = {
  guestName: string;
  currentStatus: "pending" | "attending" | "not_attending";
};

export function RsvpSection({ guestName, currentStatus }: RsvpSectionProps) {
  return (
    <section className="px-6 py-16 text-center">
      <h2 className="font-serif text-2xl text-foreground">
        Dear {guestName}, will you join us?
      </h2>

      {currentStatus === "pending" ? (
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <Button className="bg-primary text-primary-foreground" disabled>
            Accept with Pleasure
          </Button>
          <Button variant="outline" disabled>
            Decline with Regret
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            RSVP submission is wired up in Phase 7.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">
          You&apos;ve already responded:{" "}
          <strong>{currentStatus.replace("_", " ")}</strong>
        </p>
      )}
    </section>
  );
}