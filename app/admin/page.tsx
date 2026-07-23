import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { data: weddings } = await supabase
    .from("weddings")
    .select("id, bride_name, groom_name, wedding_date, status, guest_access_token, dashboard_access_token")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Weddings</h1>
        <Link href="/admin/new" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
          + New Wedding
        </Link>
      </div>

      <ul className="mt-8 flex flex-col gap-4">
        {weddings?.map((w) => (
          <li key={w.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{w.bride_name} & {w.groom_name}</span>
              <span className={`text-sm ${w.status === "archived" ? "text-muted-foreground" : "text-primary"}`}>
                {w.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{w.wedding_date}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <Link href={`/${w.guest_access_token}`} target="_blank" className="text-primary underline">
                Guest link
              </Link>
              <Link href={`/dashboard/${w.dashboard_access_token}`} target="_blank" className="text-primary underline">
                Couple dashboard
              </Link>
              <Link href={`/admin/weddings/${w.id}`} className="text-primary underline">
                Manage guests
              </Link>
              <Link href={`/admin/weddings/${w.id}/edit`} className="text-primary underline">
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
