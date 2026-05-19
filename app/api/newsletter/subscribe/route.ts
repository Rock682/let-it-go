import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string };
  if (!body.email?.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, message: "Subscribed successfully" });
}
