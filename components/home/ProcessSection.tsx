"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { PhoneCall, PenTool, Code2, Rocket, Check } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Discovery call",
    time: "Week 1",
    desc: "We learn how your business works, agree on what to build first, and send a fixed-price proposal.",
    cmd: "elevare discover --client you",
    out: ["✓ Goals and users mapped", "✓ Scope agreed: 3 milestones", "✓ Fixed-price proposal sent"],
  },
  {
    icon: PenTool,
    title: "Design & prototype",
    time: "Weeks 1–3",
    desc: "Wireframes, then a clickable prototype. You approve every screen before code is written.",
    cmd: "elevare design --prototype",
    out: ["✓ 24 screens in Figma", "✓ Clickable prototype shared", "✓ Approved by you"],
  },
  {
    icon: Code2,
    title: "Build in sprints",
    time: "Weeks 3–10",
    desc: "Short sprints with a working demo every week, so you always see real progress.",
    cmd: "elevare build --sprints 4 --demo weekly",
    out: ["✓ Sprint 1  auth + dashboard", "✓ Sprint 2  payments + admin", "✓ 312 tests passing"],
  },
  {
    icon: Rocket,
    title: "Launch & support",
    time: "Ongoing",
    desc: "We deploy, hand over documentation, and support you for 30 days after launch.",
    cmd: "elevare deploy --prod",
    out: ["✓ Live at yourcompany.com", "✓ Docs and handover done", "✓ 30-day support active"],
  },
];

function Step({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = steps[i];
  const Icon = s.icon;
  return (
    <li ref={ref} className="relative flex gap-6 pb-14 last:pb-0 lg:pb-32">
      <div
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ${
          active
            ? "border-brand/60 bg-gradient-to-br from-brand-deep to-indigo text-white shadow-[0_0_40px_-6px_rgba(56,189,248,0.8)]"
            : "border-border bg-surface text-text-3"
        }`}
      >
        <Icon size={22} />
      </div>
      <div className={`pt-1 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-50"}`}>
        <p className="font-mono text-xs text-text-3">
          0{i + 1} · {s.time}
        </p>
        <h3 className="mt-2 text-xl text-text-1">{s.title}</h3>
        <p className="mt-2 max-w-md text-[15px] text-text-2">{s.desc}</p>
      </div>
    </li>
  );
}

function Terminal({ active }: { active: number }) {
  return (
    <div data-tilt="4" className="tilt glass-strong overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
        </div>
        <span className="font-mono text-xs text-text-3">~/your-project — zsh</span>
        <span className="w-10" />
      </div>
      <div className="min-h-[380px] space-y-5 p-6 font-mono text-[13px] leading-6">
        {steps.slice(0, active + 1).map((s, i) => (
          <motion.div key={s.cmd} initial={{ opacity: 0, y: 8 }} animate={{ opacity: i === active ? 1 : 0.45, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-text-1">
              <span className="text-green">➜</span> <span className="text-brand">~</span> {s.cmd}
            </p>
            <AnimatePresence>
              {s.out.map((o, j) => (
                <motion.p
                  key={o}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + j * 0.25 }}
                  className="text-text-2"
                >
                  <span className="text-green">{o.slice(0, 1)}</span>
                  {o.slice(1)}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
        <p className="caret text-text-1">
          <span className="text-green">➜</span> <span className="text-brand">~</span>{" "}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-[11px] text-text-3">
        <span className="flex items-center gap-1.5">
          <Check size={12} className="text-green" /> step {active + 1} of {steps.length}
        </span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span key={i} className={`h-1 w-6 rounded-full transition-colors duration-500 ${i <= active ? "bg-brand" : "bg-white/10"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-t border-border py-24 lg:py-32">
      <div className="container-x">
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <span className="text-label">How we work</span>
          <h2 className="mt-5">
            <span className="text-silver">From first call to launch</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-text-2">A typical build takes six to twelve weeks. Scroll through it.</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <ol className="relative">
            <div aria-hidden className="absolute bottom-0 left-7 top-7 w-px bg-border">
              <motion.div
                className="w-full bg-gradient-to-b from-brand via-indigo to-violet shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {steps.map((_, i) => (
              <Step key={i} i={i} active={i <= active} onActive={setActive} />
            ))}
          </ol>
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <Terminal active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
