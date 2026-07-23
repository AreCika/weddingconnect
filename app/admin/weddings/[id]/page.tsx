import { createClient } from "@/lib/supabase/server";
import { archiveWedding, unarchiveWedding } from "@/lib/actions/admin-weddings";

export default async function ManageWeddingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: wedding } = await supabase.from("weddings").select("*").eq("id", id).single();
  const { data: guests } = await supabase
    .from("guests")
    .select("name, phone_number, rsvp_status, headcount")
    .eq("wedding_id", id)
    .order("responded_at", { ascending: false });

  const attending = guests?.filter((g) => g.rsvp_status === "attending") ?? [];
  const totalHeadcount = attending.reduce((sum, g) => sum + g.headcount, 0);
  const archiveWithId = archiveWedding.bind(null, id);
  const unarchiveWithId = unarchiveWedding.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{wedding?.bride_name} & {wedding?.groom_name}</h1>
        {wedding?.status !== "archived" ? (
          <form action={archiveWithId}>
            <button type="submit" className="text-sm text-muted-foreground underline">
              Archive Wedding
            </button>
          </form>
        ) : (
          <form action={unarchiveWithId}>
            <button type="submit" className="text-sm text-muted-foreground underline">
              Unarchive Wedding
            </button>
          </form>
        )}
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {attending.length} attending ({totalHeadcount} total guests) · {guests?.length ?? 0} responses
      </p>

      <a
        href={`/admin/weddings/${id}/export`}
        className="mt-4 inline-block rounded-md border px-4 py-2 text-sm text-primary"
      >
        Download Guest List (CSV)
      </a>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Headcount</th>
          </tr>
        </thead>
        <tbody>
          {guests?.map((g) => (
            <tr key={g.phone_number} className="border-b">
              <td className="py-2">{g.name}</td>
              <td>{g.phone_number}</td>
              <td>{g.rsvp_status}</td>
              <td>{g.headcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
