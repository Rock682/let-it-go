"use client";
import { useMemo, useState } from "react";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(36);
  const emi = useMemo(() => {
    const r = rate / 1200;
    return (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  }, [principal, rate, months]);

  return (
    <section className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">EMI Calculator</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="rounded border p-2" />
        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="rounded border p-2" />
        <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="rounded border p-2" />
      </div>
      <p className="mt-4 text-lg">Monthly EMI: ₹{Number.isFinite(emi) ? emi.toFixed(0) : "0"}</p>
    </section>
  );
}
