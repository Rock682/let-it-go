const URL_PATTERN = /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|net|org|io|co|app|dev|info|biz|me|ly|gg|tv)\b)/i;
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_PATTERN = /(?:\+?\d[\d\s().-]{7,}\d)/;
const REPEATED_PATTERN = /(.)\1{8,}/;
const SPAM_WORD_PATTERN = /\b(?:crypto|airdrop|casino|viagra|forex|telegram|whatsapp)\b/i;

export type ValidationResult =
  | { ok: true; text: string }
  | { ok: false; message: string };

export function validateMistakeText(rawText: unknown): ValidationResult {
  if (typeof rawText !== "string") {
    return { ok: false, message: "Write one short sentence." };
  }

  const text = rawText.replace(/\s+/g, " ").trim();

  if (!text) {
    return { ok: false, message: "Write one short sentence." };
  }

  if (text.length > 120) {
    return { ok: false, message: "Keep it under 120 characters." };
  }

  if (URL_PATTERN.test(text) || EMAIL_PATTERN.test(text) || PHONE_PATTERN.test(text)) {
    return { ok: false, message: "Please leave links and contact details out of this space." };
  }

  if (REPEATED_PATTERN.test(text) || SPAM_WORD_PATTERN.test(text)) {
    return { ok: false, message: "Please keep this quiet and human." };
  }

  return { ok: true, text };
}
