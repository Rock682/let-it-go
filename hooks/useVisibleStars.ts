"use client";

import { useEffect, useState } from "react";
import type { MistakeStar } from "@/lib/types";

export function useVisibleStars() {
  const [stars, setStars] = useState<MistakeStar[]>([]);

  useEffect(() => {
    let alive = true;

    async function loadStars() {
      try {
        const response = await fetch("/api/mistakes", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { stars?: MistakeStar[] };
        if (alive) setStars((payload.stars ?? []).slice(0, 300));
      } catch {
        if (alive) setStars([]);
      }
    }

    loadStars();
    const interval = window.setInterval(loadStars, 90_000);

    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, []);

  return { stars, setStars };
}
