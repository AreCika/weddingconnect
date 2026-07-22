"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type RsvpSectionProps = {
  weddingId: string;
};

// Form UI only for now — actual submission (writing to the database) is
// Phase 7's job. The hidden weddingId field is already here because
// Phase 7's Server Action will need it to know which wedding this RSVP
// belongs to.
export function RsvpSection({ weddingId }: RsvpSectionProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [attending, setAttending] = useState<"attending" | "not_attending" | null>(null);
  const [headcount, setHeadcount] = useState(1);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="px-6 py-16">
      <h2 className="text-center font-serif text-2xl text-foreground">
        Will you be joining us?
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-sm flex-col gap-4"
      >
        <input type="hidden" name="weddingId" value={weddingId} />

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-muted-foreground">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-muted-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="e.g. 0123456789"
            className="rounded-md border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            Will you be attending?
          </span>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={attending === "attending" ? "default" : "outline"}
              className={
                attending === "attending"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
              onClick={() => setAttending("attending")}
            >
              Joyfully Accept
            </Button>
            <Button
              type="button"
              variant={attending === "not_attending" ? "default" : "outline"}
              className={
                attending === "not_attending"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
              onClick={() => setAttending("not_attending")}
            >
              Regretfully Decline
            </Button>
          </div>
        </div>

        {attending === "attending" && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="headcount"
              className="text-sm text-muted-foreground"
            >
              Number of Guests (including yourself)
            </label>
            <input
              id="headcount"
              type="number"
              min={1}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2 text-foreground"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled
          className="mt-2 bg-primary text-primary-foreground"
        >
          Submit RSVP
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          RSVP submission is wired up in Phase 7.
        </p>
      </form>
    </section>
  );
}