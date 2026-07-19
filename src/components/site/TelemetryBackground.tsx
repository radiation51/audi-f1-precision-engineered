import { useEffect, useRef } from "react";

/**
 * Fixed low-opacity telemetry canvas: moving grid + waveform.
 * Client-only rendering; safe under SSR because useEffect runs on client.
 */
export function TelemetryBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Faint grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      const gap = 60;
      const offset = (t * 0.4) % gap;
      for (let x = -offset; x < w; x += gap) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = -offset; y < h; y += gap) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Telemetry waveform
      ctx.strokeStyle = "rgba(227,6,19,0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const midY = h * 0.72;
      for (let x = 0; x <= w; x += 4) {
        const p = x / w;
        const y = midY
          + Math.sin(p * 12 + t * 0.02) * 22
          + Math.sin(p * 40 + t * 0.05) * 10
          + Math.sin(p * 3 + t * 0.01) * 40;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary muted line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      const midY2 = h * 0.28;
      for (let x = 0; x <= w; x += 4) {
        const p = x / w;
        const y = midY2 + Math.sin(p * 8 - t * 0.02) * 18 + Math.sin(p * 20 - t * 0.04) * 8;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12%),transparent_60%)]" />
      <canvas ref={ref} className="h-full w-full opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
