import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateMistakeText } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ stars: [] });
  }

  const { data, error } = await supabase
    .from("mistakes")
    .select("id,text,created_at,visible_until")
    .gt("visible_until", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    return NextResponse.json({ message: "The universe is quiet right now." }, { status: 500 });
  }

  return NextResponse.json({ stars: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateMistakeText(body?.text);

  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const createdAt = new Date();
  const visibleUntil = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      {
        star: {
          id: crypto.randomUUID(),
          text: validation.text,
          created_at: createdAt.toISOString(),
          visible_until: visibleUntil.toISOString(),
        },
      },
      { status: 201 },
    );
  }

  const { data, error } = await supabase
    .from("mistakes")
    .insert({
      text: validation.text,
      created_at: createdAt.toISOString(),
      visible_until: visibleUntil.toISOString(),
    })
    .select("id,text,created_at,visible_until")
    .single();

  if (error) {
    return NextResponse.json({ message: "It could not drift away yet. Try once more." }, { status: 500 });
  }

  return NextResponse.json({ star: data }, { status: 201 });
}
