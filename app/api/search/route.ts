import { NextRequest, NextResponse } from "next/server";
import { financeCategories } from "@/lib/data/site";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").toLowerCase();
  const results = financeCategories.filter((c) => c.toLowerCase().includes(q));
  return NextResponse.json({ results });
}
