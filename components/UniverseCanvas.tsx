"use client";

import { useEffect, useRef } from "react";
import type { MistakeStar } from "@/lib/types";
import { isExpiringSoon, starSeedFromId } from "@/lib/stars";

type Props = {
  stars: MistakeStar[];
  paused?: boolean;
};

type RenderStar = {
  x: number;
  y: number;
  z: number;
  radius: number;
  alpha: number;
  drift: number;
  expiring: boolean;
};

function buildRenderStars(stars: MistakeStar[], width: number, height: number): RenderStar[] {
  const now = Date.now();

  return stars.slice(0, 300).map((star, index) => {
    const seed = starSeedFromId(star.id);
    const secondary = starSeedFromId(`${star.id}-${index}`);
    return {
      x: (0.08 + ((seed * 9.73) % 0.84)) * width,
      y: (0.08 + ((secondary * 7.91) % 0.84)) * height,
      z: 0.38 + ((seed * 5.13) % 0.62),
      radius: 0.45 + ((secondary * 2.7) % 1.35),
      alpha: 0.2 + ((seed * 3.1) % 0.32),
      drift: -0.012 - ((secondary * 0.018) % 0.018),
      expiring: isExpiringSoon(star, now),
    };
  });
}

export function UniverseCanvas({ stars, paused = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<RenderStar[]>([]);
  const frameRef = useRef<number | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let last = performance.now();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      starsRef.current = buildRenderStars(stars, width, height);
    }

    function draw(timestamp: number) {
      const delta = Math.min(48, timestamp - last);
      last = timestamp;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(3, 5, 11, 0.72)";
      context.fillRect(0, 0, width, height);

      const time = timestamp * 0.00006;
      for (const star of starsRef.current) {
        if (!pausedRef.current) {
          star.y += star.drift * delta * star.z;
          star.x += Math.sin(time + star.x * 0.002) * 0.0035 * delta;
          if (star.y < -12) star.y = height + 12;
        }

        const pulse = 0.84 + Math.sin(time * 17 + star.x) * 0.08;
        const alpha = star.alpha * pulse;
        const radius = star.radius * star.z;

        context.beginPath();
        context.fillStyle = `rgba(244, 238, 222, ${alpha})`;
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);
        context.fill();

        if (star.expiring) {
          const gradient = context.createLinearGradient(star.x, star.y, star.x + 20, star.y + 34);
          gradient.addColorStop(0, `rgba(244, 238, 222, ${alpha * 0.18})`);
          gradient.addColorStop(1, "rgba(244, 238, 222, 0)");
          context.strokeStyle = gradient;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.quadraticCurveTo(star.x + 8, star.y + 14, star.x + 20, star.y + 34);
          context.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [stars]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
