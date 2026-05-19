"use client";
import { useState } from "react";

export function CookieConsent() {
  const [accepted, setAccepted] = useState(true);
  if (accepted) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 rounded-xl border bg-white p-4 shadow-xl dark:bg-slate-900">
      <p className="text-sm">We use cookies for analytics and personalization. By continuing, you consent.</p>
      <button className="mt-2 rounded bg-slate-900 px-3 py-2 text-white" onClick={() => setAccepted(true)}>Accept</button>
    </div>
  );
}
