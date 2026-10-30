"use client";

import { useEffect } from "react";

/**
 * Global pointer effects:
 *  - `.card`            → spotlight glow that follows the cursor
 *  - `[data-tilt]`      → gentle 3D tilt toward the cursor
 *  - `[data-magnetic]`  → element is pulled slightly toward the cursor
 */
export function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let card: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let mag: HTMLElement | null = null;

    const reset = (el: HTMLElement | null, props: string[]) => {
      if (!el) return;
      props.forEach((p) => (p.startsWith("--") ? el.style.removeProperty(p) : ((el.style as any)[p] = "")));
    };

    const onMove = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;

      const c = t?.closest?.(".card") as HTMLElement | null;
      if (card && card !== c) reset(card, ["--mx", "--my"]);
      card = c;
      if (c) {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", `${e.clientX - r.left}px`);
        c.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tl = t?.closest?.("[data-tilt]") as HTMLElement | null;
      if (tilt && tilt !== tl) reset(tilt, ["transform"]);
      tilt = tl;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const max = Number(tl.dataset.tilt) || 6;
        tl.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      }

      const m = t?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (mag && mag !== m) reset(mag, ["transform"]);
      mag = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.transform = `translate(${dx * 0.18}px, ${dy * 0.25}px)`;
      }
    };

    const onLeave = () => {
      reset(card, ["--mx", "--my"]);
      reset(tilt, ["transform"]);
      reset(mag, ["transform"]);
      card = tilt = mag = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
