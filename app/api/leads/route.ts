import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// POST — website contact form submission
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, business_name, message } = body;
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("as_leads").insert({
    name,
    email,
    business_name: business_name || null,
    message: message || null,
    status: "new",
    source: "website_form",
  });

  if (error) {
    console.error("Lead insert error:", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// GET — dashboard fetches all leads
export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("as_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH — update lead status or notes
export async function PATCH(req: NextRequest) {
  let body: { id: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { id, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: "ID required." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("as_leads").update(updates).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE — remove a lead
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("as_leads").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
