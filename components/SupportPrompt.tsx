"use client";

import { useState } from "react";

const AMOUNTS = [1, 3, 5] as const;

type Props = {
  visible: boolean;
};

export function SupportPrompt({ visible }: Props) {
  const [loadingAmount, setLoadingAmount] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function support(amount: number) {
    setLoadingAmount(amount);
    setMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const payload = (await response.json()) as { url?: string; message?: string };

      if (!response.ok || !payload.url) {
        setMessage(payload.message ?? "Support is unavailable right now.");
        return;
      }

      window.location.href = payload.url;
    } catch {
      setMessage("Support is unavailable right now.");
    } finally {
      setLoadingAmount(null);
    }
  }

  return (
    <aside
      className={`pointer-events-auto fixed bottom-5 left-1/2 z-30 w-[min(92vw,28rem)] -translate-x-1/2 rounded-3xl border border-white/8 bg-[#070a12]/70 px-5 py-4 text-center shadow-2xl shadow-black/30 backdrop-blur-md transition duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <p className="text-sm text-white/68">Help keep this space quiet.</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        {AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => support(amount)}
            disabled={loadingAmount !== null}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/76 transition hover:border-white/22 hover:bg-white/[0.04] disabled:cursor-wait disabled:opacity-55"
          >
            {loadingAmount === amount ? "…" : `$${amount}`}
          </button>
        ))}
      </div>
      {message ? <p className="mt-3 text-xs text-white/42">{message}</p> : null}
    </aside>
  );
}
