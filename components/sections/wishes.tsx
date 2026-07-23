"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { submitWish, type WishFormState } from "@/lib/actions/wishes";
import type { Wish } from "@/lib/weddings";

type WishesProps = {
  weddingId: string;
  wishes: Wish[];
};

export function Wishes({ weddingId, wishes }: WishesProps) {
  const [items, setItems] = useState(wishes);
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<WishFormState>({ status: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);
    const result = await submitWish({ weddingId, guestName, message });
    setFormState(result);

    if (result.status === "success") {
      setItems((prev) => [
        {
          id: crypto.randomUUID(),
          guest_name: guestName.trim(),
          message: message.trim(),
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setGuestName("");
      setMessage("");
    }

    setIsSubmitting(false);
  }

  return (
    <section className="relative px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">
          Wishes For The Couple
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <Reveal index={1}>
        <div className="mx-auto mt-10 flex max-h-80 max-w-sm flex-col gap-4 overflow-y-auto rounded-2xl border border-primary/20 bg-background/70 p-6 text-left shadow-sm">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Be the first to leave a wish.
            </p>
          ) : (
            items.map((wish) => (
              <div
                key={wish.id}
                className="border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <p className="font-serif text-base text-foreground">
                  {wish.message}
                </p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-primary">
                  {wish.guest_name}
                </p>
              </div>
            ))
          )}
        </div>
      </Reveal>

      <Reveal index={2}>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-sm flex-col gap-4 rounded-2xl border border-primary/20 bg-background/70 p-8 text-left shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="wish-name" className="text-sm text-muted-foreground">
              Your Name
            </label>
            <input
              id="wish-name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="rounded-md border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="wish-message" className="text-sm text-muted-foreground">
              Your Message
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={500}
              rows={4}
              className="resize-none rounded-md border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:outline-none"
            />
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-1.5 bg-primary text-primary-foreground"
            >
              <Send className="size-4" />
              {isSubmitting ? "Sending..." : "Send Wish"}
            </Button>
          </motion.div>

          {formState.status === "error" && (
            <p className="text-center text-xs text-destructive">
              {formState.message}
            </p>
          )}
          {formState.status === "success" && (
            <p className="text-center text-xs text-primary">
              Thank you for your kind words!
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
