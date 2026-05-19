import { NextRequest, NextResponse } from "next/server";

const offerMap: Record<string, string> = {
  "hdfc-regalia": "https://earnkaro.com/track/hdfc-regalia?utm_source=rupeeorbit",
  "axis-loan": "https://impact.com/axis-loan?utm_source=rupeeorbit",
  "groww-demat": "https://cj.com/groww-demat?utm_source=rupeeorbit"
};

export async function GET(request: NextRequest) {
  const offer = request.nextUrl.searchParams.get("offer") ?? "";
  const destination = offerMap[offer] ?? "https://rupeeorbit.in/comparisons";
  return NextResponse.redirect(destination, { status: 302 });
}
