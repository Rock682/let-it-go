import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    users: 1240,
    clicksToday: 438,
    topVertical: "Credit Cards",
    revenueEstimateINR: 32250
  });
}
