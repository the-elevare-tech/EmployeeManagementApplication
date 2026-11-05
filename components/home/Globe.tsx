"use client";

import { useEffect, useRef } from "react";
import { LAND_DOTS } from "@/lib/globeDots";

type LonLat = [number, number];

const HUBS: { name: string; at: LonLat; color: string }[] = [
  { name: "Lahore", at: [74.33, 31.48], color: "#38BDF8" },
  { name: "San Francisco", at: [-122.4, 37.79], color: "#A78BFA" },
];

/** Client regions: arcs fly from an office to each. */
const ROUTES: { from: number; to: LonLat }[] = [
  { from: 0, to: [55.27, 25.2] }, // Dubai
  { from: 0, to: [46.68, 24.71] }, // Riyadh
  { from: 0, to: [-0.13, 51.5] }, // London
  { from: 0, to: [151.2, -33.87] }, // Sydney
  { from: 1, to: [-74.0, 40.71] }, // New York
  { from: 1, to: [-79.38, 43.65] }, // Toronto
  { from: 1, to: [-0.13, 51.5] }, // London
];

const RAD = Math.PI / 180;
const TILT = 18 * RAD; // look slightly down onto the northern hemisphere

function toVec([lon, lat]: LonLat): [number, number, number] {
  const l = lon * RAD;
  const p = lat * RAD;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

/** Great-circle interpolation between two unit vectors. */
function slerp(a: number[], b: number[], t: number) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(dot);
  if (w < 1e-6) return a;
  const s = Math.sin(w);
  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/**
 * Dotted 3D globe drawn on canvas: rotates slowly, both offices pulse and
 * arcs fly out to client regions. Drag to spin it. No libraries.
 */
export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = LAND_DOTS.map(toVec);
    const hubs = HUBS.map((h) => toVec(h.at));
    const routes = ROUTES.map((r) => ({ a: hubs[r.from], b: toVec(r.to), color: HUBS[r.from].color }));

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) requestAnimationFrame(draw); // still frame needs a redraw on resize
    });
    ro.observe(canvas);

    // rotation (radians); start with Lahore facing the viewer
    let rot = -74 * RAD;
    const spin = reduced ? 0 : 0.11; // rad per second
    let dragging = false;
    let lastX = 0;

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    /** Rotate a unit vector into view space: x right, y up, z towards viewer. */
    const view = (v: number[]) => {
      const c = Math.cos(rot);
      const s = Math.sin(rot);
      const x1 = v[0] * c - v[1] * s;
      const y1 = v[0] * s + v[1] * c;
      const z1 = v[2];
      // y1 = sideways, x1 = depth, z1 = up; then tilt around the sideways axis
      return { x: y1, y: z1 * cosT - x1 * sinT, z: x1 * cosT + z1 * sinT };
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rot -= (e.clientX - lastX) * 0.008;
      lastX = e.clientX;
    };
    const onUp = () => (dragging = false);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    let prev = performance.now();
    const t0 = prev;

    const draw = (now: number) => {
      if (!reduced) raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!visible && !reduced) return;
      if (!dragging) rot -= spin * dt;
      const t = (now - t0) / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2;
      const px = (p: { x: number; y: number }, lift = 1) => [cx + p.x * R * lift, cy - p.y * R * lift] as const;

      // atmosphere + body
      const halo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      halo.addColorStop(0, "rgba(56,189,248,0.22)");
      halo.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#14204A");
      body.addColorStop(1, "#060B1E");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(56,189,248,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // land dots
      const dotR = Math.max(0.8, R / 150);
      for (const d of dots) {
        const p = view(d);
        if (p.z <= 0) continue;
        ctx.globalAlpha = 0.18 + 0.7 * p.z;
        ctx.fillStyle = "#9FB4D9";
        const [x, y] = px(p);
        ctx.fillRect(x - dotR, y - dotR, dotR * 2, dotR * 2);
      }
      ctx.globalAlpha = 1;

      // arcs: each one draws out, holds, then fades, staggered
      const CYCLE = 4.2;
      routes.forEach((r, i) => {
        const phase = ((t + i * (CYCLE / routes.length) * 1.7) % CYCLE) / CYCLE; // 0..1
        const grow = Math.min(1, phase / 0.45);
        const fade = phase < 0.7 ? 1 : 1 - (phase - 0.7) / 0.3;
        const steps = 48;
        const n = Math.max(2, Math.round(steps * grow));
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        let started = false;
        ctx.beginPath();
        for (let k = 0; k <= n; k++) {
          const s = (k / steps);
          const v = slerp(r.a, r.b, s);
          const lift = 1 + 0.22 * Math.sin(Math.PI * s);
          const p = view(v);
          // hidden only when behind the globe AND inside its silhouette
          const outside = (p.x * p.x + p.y * p.y) * lift * lift > 1;
          if (p.z < 0 && !outside) {
            started = false;
            continue;
          }
          const [x, y] = px(p, lift);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
          if (k === n && grow < 1) {
            // glowing head
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.shadowColor = r.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = 0.85 * fade;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // landing ping at the destination
        const end = view(r.b);
        if (end.z > 0 && grow >= 1) {
          const [x, y] = px(end);
          const pr = 2 + 8 * ((phase - 0.45) / 0.55);
          ctx.strokeStyle = r.color;
          ctx.globalAlpha = Math.max(0, 0.8 * (1 - (phase - 0.45) / 0.55));
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, pr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.fillStyle = r.color;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // offices: pulsing markers with labels
      HUBS.forEach((hub, i) => {
        const p = view(hubs[i]);
        if (p.z <= 0) return;
        const [x, y] = px(p);
        const pulse = (t * 0.8 + i * 0.5) % 1;
        ctx.globalAlpha = (1 - pulse) * p.z;
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = Math.min(1, 0.4 + p.z);
        ctx.save();
        ctx.shadowColor = hub.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = hub.color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        // label pill
        const label = hub.name;
        ctx.font = "500 11px ui-monospace, 'Geist Mono', monospace";
        const tw = ctx.measureText(label).width;
        const lx = Math.min(w - tw - 22, x + 10);
        const ly = y - 24;
        ctx.fillStyle = "rgba(5,8,22,0.85)";
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(lx, ly, tw + 14, 18, 9);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#E2E8F0";
        ctx.fillText(label, lx + 7, ly + 12.5);
        ctx.globalAlpha = 1;
      });

    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Globe showing Elevare Tech offices in Lahore and San Francisco connected to clients in the UAE, Saudi Arabia, the UK, the US, Canada and Australia"
      className={`block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
    />
  );
}
