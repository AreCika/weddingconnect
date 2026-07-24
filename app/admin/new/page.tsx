import type { Metadata } from "next";
import { createWedding } from "@/lib/actions/admin-weddings";

export const metadata: Metadata = { title: "New Wedding" };

export default function NewWeddingPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-12">
      <h1 className="mb-6 text-xl font-semibold">New Wedding</h1>
      <form action={createWedding} className="flex flex-col gap-4">
        <input name="brideName" placeholder="Bride's Name" required className="rounded-md border px-3 py-2" />
        <input name="groomName" placeholder="Groom's Name" required className="rounded-md border px-3 py-2" />
        <input name="weddingDate" type="date" required className="rounded-md border px-3 py-2" />
        <input name="venueName" placeholder="Venue Name" className="rounded-md border px-3 py-2" />
        <input name="venueAddress" placeholder="Venue Address" className="rounded-md border px-3 py-2" />
        <button type="submit" className="rounded-md bg-primary py-2 text-primary-foreground">
          Create Wedding
        </button>
      </form>
    </div>
  );
}
