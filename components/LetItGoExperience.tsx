"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { SupportPrompt } from "@/components/SupportPrompt";
import { UniverseCanvas } from "@/components/UniverseCanvas";
import { useVisibleStars } from "@/hooks/useVisibleStars";
import type { MistakeStar } from "@/lib/types";
import { validateMistakeText } from "@/lib/validation";

type Phase = "idle" | "detachment" | "stillness" | "lift" | "transformation" | "star-pause" | "distance" | "silence";

const PHASES: Array<{ phase: Exclude<Phase, "idle">; duration: number }> = [
  { phase: "detachment", duration: 260 },
  { phase: "stillness", duration: 520 },
  { phase: "lift", duration: 1120 },
  { phase: "transformation", duration: 920 },
  { phase: "star-pause", duration: 260 },
  { phase: "distance", duration: 1350 },
  { phase: "silence", duration: 1000 },
];

export function LetItGoExperience() {
  const { stars, setStars } = useVisibleStars();
  const [text, setText] = useState("");
  const [releasedText, setReleasedText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const timersRef = useRef<number[]>([]);

  const isRitualActive = phase !== "idle";
  const showSupport = submissionCount > 0 && phase === "idle";

  const phaseClass = useMemo(() => `release-object release-${phase}`, [phase]);

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }

  function beginRitual(value: string, storedStar?: MistakeStar) {
    clearTimers();
    setReleasedText(value);
    setPhase("detachment");

    let elapsed = PHASES[0].duration;
    PHASES.slice(1).forEach(({ phase: nextPhase, duration }) => {
      const timer = window.setTimeout(() => setPhase(nextPhase), elapsed);
      timersRef.current.push(timer);
      elapsed += duration;
    });

    const complete = window.setTimeout(() => {
      if (storedStar) setStars((current) => [storedStar, ...current].slice(0, 300));
      setPhase("idle");
      setReleasedText("");
      setSubmissionCount((count) => count + 1);
    }, PHASES.reduce((total, item) => total + item.duration, 0));
    timersRef.current.push(complete);
  }

  async function submitMistake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRitualActive) return;

    const validation = validateMistakeText(text);
    if (!validation.ok) {
      setError(validation.message);
      return;
    }

    setError("");
    setText("");
    beginRitual(validation.text);

    try {
      const response = await fetch("/api/mistakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: validation.text }),
      });
      const payload = (await response.json()) as { star?: MistakeStar; message?: string };

      if (!response.ok || !payload.star) {
        setError(payload.message ?? "It could not drift away yet. Try once more.");
        return;
      }

      const finishTimer = window.setTimeout(() => {
        setStars((current) => [payload.star as MistakeStar, ...current].slice(0, 300));
      }, 4430);
      timersRef.current.push(finishTimer);
    } catch {
      setError("It could not drift away yet. Try once more.");
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#03050b] text-white">
      <UniverseCanvas stars={stars} paused={phase === "stillness"} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(3,5,11,0.18)_38%,rgba(3,5,11,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />

      <section className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="w-full max-w-2xl text-center">
          <p
            className={`mb-7 text-[0.68rem] uppercase tracking-[0.42em] text-white/36 transition duration-300 ${
              isRitualActive ? "opacity-0" : "opacity-100"
            }`}
          >
            Let It Go
          </p>
          <h1
            className={`text-balance text-4xl font-light tracking-[-0.04em] text-[#f4efe2] sm:text-6xl transition duration-300 ${
              isRitualActive ? "opacity-0" : "opacity-100"
            }`}
          >
            What is your biggest mistake?
          </h1>

          <form
            onSubmit={submitMistake}
            className={`mx-auto mt-10 max-w-xl transition duration-200 ${isRitualActive ? "pointer-events-none scale-[0.99] opacity-0" : "opacity-100"}`}
          >
            <label className="sr-only" htmlFor="mistake">
              Your biggest mistake
            </label>
            <textarea
              id="mistake"
              value={text}
              onChange={(event) => {
                setText(event.target.value.slice(0, 120));
                if (error) setError("");
              }}
              maxLength={120}
              rows={3}
              placeholder="Write it once. No one will know it was yours."
              className="min-h-32 w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-5 text-center text-lg leading-relaxed text-white/82 outline-none shadow-2xl shadow-black/20 backdrop-blur-md transition placeholder:text-white/28 focus:border-white/20 focus:bg-white/[0.05]"
              disabled={isRitualActive}
            />
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-white/34">
              <span>{error || "Anonymous. Untracked. Quiet."}</span>
              <span>{text.length}/120</span>
            </div>
            <button
              type="submit"
              disabled={!text.trim() || isRitualActive}
              className="mt-7 rounded-full border border-white/12 bg-white/[0.055] px-7 py-3 text-sm tracking-wide text-white/76 transition hover:border-white/24 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Release it
            </button>
          </form>
        </div>
      </section>

      {releasedText ? (
        <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-8">
          <div className={phaseClass} aria-live="polite">
            {phase === "star-pause" || phase === "distance" || phase === "silence" ? <span className="release-star" /> : releasedText}
          </div>
        </div>
      ) : null}

      <SupportPrompt visible={showSupport} />
    </main>
  );
}
