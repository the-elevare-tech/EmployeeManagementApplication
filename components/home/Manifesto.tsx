"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "We're engineers in Lahore and San Francisco building software for companies around the world. We design it, build it, automate it and stand behind it, so you can focus on growing your business.";
const ACCENT = new Set(["design", "build", "automate"]);

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${accent ? "text-electric" : "text-text-1"}`}>
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");

  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-drift absolute left-1/2 top-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.16),transparent)] blur-2xl" />
      </div>
      <div className="container-x">
        <div className="mb-8 text-center">
          <span className="text-label">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Who we are
          </span>
        </div>
        <p
          ref={ref}
          className="mx-auto max-w-5xl text-center font-display text-[clamp(1.75rem,3.8vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.03em]"
        >
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const clean = w.replace(/[^a-z]/gi, "").toLowerCase();
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} accent={ACCENT.has(clean)}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
