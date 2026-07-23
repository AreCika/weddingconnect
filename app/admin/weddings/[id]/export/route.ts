import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: guests, error } = await supabase
    .from("guests")
    .select("name, phone_number, headcount, responded_at")
    .eq("wedding_id", id)
    .eq("rsvp_status", "attending")
    .order("name");

  if (error) {
    return NextResponse.json({ error: "Failed to load guests" }, { status: 500 });
  }

  const header = "Name,Phone,Headcount,Responded At\n";
  const rows = (guests ?? [])
    .map((g) => `"${g.name}","${g.phone_number}",${g.headcount},"${g.responded_at}"`)
    .join("\n");

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="guests-${id}.csv"`,
    },
  });
}
