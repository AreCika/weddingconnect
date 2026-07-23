import { getDashboardData } from "@/lib/weddings";

export default async function CoupleDashboardPage({
  params,
}: {
  params: Promise<{ weddingToken: string }>;
}) {
  const { weddingToken } = await params;
  const { wedding, guests, wishes } = await getDashboardData(weddingToken);

  const attending = guests.filter((g) => g.rsvp_status === "attending");
  const totalHeadcount = attending.reduce((sum, g) => sum + g.headcount, 0);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">{wedding.bride_name} & {wedding.groom_name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{wedding.wedding_date}</p>

      <div className="mt-6 rounded-lg border p-4">
        <p className="text-lg font-medium">{attending.length} guests attending</p>
        <p className="text-sm text-muted-foreground">
          {totalHeadcount} total people (with plus-ones) · {guests.length} total responses
        </p>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Guest Responses</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th>Status</th>
            <th>Headcount</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.phone_number} className="border-b">
              <td className="py-2">{g.name}</td>
              <td>{g.rsvp_status}</td>
              <td>{g.headcount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 text-lg font-semibold">Wishes ({wishes.length})</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {wishes.map((w, i) => (
          <li key={i} className="rounded-md border p-3 text-sm">
            <p className="font-medium">{w.guest_name}</p>
            <p className="text-muted-foreground">{w.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
