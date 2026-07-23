import { createClient } from "@/lib/supabase/server";
import { updateWedding } from "@/lib/actions/admin-weddings";

export default async function EditWeddingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: wedding } = await supabase.from("weddings").select("*").eq("id", id).single();

  const updateWithId = updateWedding.bind(null, id);

  return (
    <div className="mx-auto max-w-sm px-6 py-12">
      <h1 className="mb-6 text-xl font-semibold">Edit Wedding</h1>
      <form action={updateWithId} className="flex flex-col gap-4">
        <input name="brideName" defaultValue={wedding?.bride_name} required className="rounded-md border px-3 py-2" />
        <input name="groomName" defaultValue={wedding?.groom_name} required className="rounded-md border px-3 py-2" />
        <input name="weddingDate" type="date" defaultValue={wedding?.wedding_date} required className="rounded-md border px-3 py-2" />
        <input name="venueName" defaultValue={wedding?.venue_name ?? ""} className="rounded-md border px-3 py-2" />
        <input name="venueAddress" defaultValue={wedding?.venue_address ?? ""} className="rounded-md border px-3 py-2" />
        <button type="submit" className="rounded-md bg-primary py-2 text-primary-foreground">
          Save Changes
        </button>
      </form>
    </div>
  );
}
