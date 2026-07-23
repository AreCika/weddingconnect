"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Heart, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

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
    <section className="relative px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">
          Will You Be Joining Us?
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <Reveal index={1}>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-sm flex-col gap-4 rounded-2xl border border-primary/20 bg-background/70 p-8 text-left shadow-sm"
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
              className="rounded-md border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
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
              className="rounded-md border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              Will you be attending?
            </span>
            <div className="flex gap-3">
              <motion.div whileTap={{ scale: 0.96 }} className="flex-1">
                <Button
                  type="button"
                  variant={attending === "attending" ? "default" : "outline"}
                  className={`w-full gap-1.5 ${
                    attending === "attending"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => setAttending("attending")}
                >
                  <Heart className="size-4" />
                  Joyfully Accept
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.96 }} className="flex-1">
                <Button
                  type="button"
                  variant={attending === "not_attending" ? "default" : "outline"}
                  className={`w-full gap-1.5 ${
                    attending === "not_attending"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => setAttending("not_attending")}
                >
                  <HeartCrack className="size-4" />
                  Regretfully Decline
                </Button>
              </motion.div>
            </div>
          </div>

          {attending === "attending" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1"
            >
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
                className="rounded-md border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
              />
            </motion.div>
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
      </Reveal>
    </section>
  );
}
