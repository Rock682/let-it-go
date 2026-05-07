import type { MistakeStar } from "@/lib/types";

export function starSeedFromId(id: string) {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0) / 4294967295;
}

export function isExpiringSoon(star: MistakeStar, now = Date.now()) {
  const visibleUntil = new Date(star.visible_until).getTime();
  const createdAt = new Date(star.created_at).getTime();
  const lifetime = Math.max(1, visibleUntil - createdAt);
  return (visibleUntil - now) / lifetime < 0.08;
}
