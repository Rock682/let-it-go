import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const SUPPORT_AMOUNTS: Record<string, number> = {
  "1": 100,
  "3": 300,
  "5": 500,
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const amount = SUPPORT_AMOUNTS[String(body?.amount ?? "")];

  if (!amount) {
    return NextResponse.json({ message: "Choose a quiet support amount." }, { status: 400 });
  }

  const stripe = getStripe();
  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!stripe) {
    return NextResponse.json({ message: "Stripe is not configured yet." }, { status: 503 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: "Quiet support for Let It Go",
            description: "A small contribution to keep the space calm and ad-free.",
          },
        },
      },
    ],
    success_url: `${origin}/?quiet=thank-you`,
    cancel_url: origin,
  });

  return NextResponse.json({ url: session.url });
}
