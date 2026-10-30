"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowRight, Sparkles, Rocket, MessageSquarePlus, Bot, Gauge } from "lucide-react";
import { GlobalMap } from "@/components/home/GlobalMap";
import { isOpen } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { end: 15, suffix: "+", label: "Projects shipped" },
  { end: 7, suffix: "", label: "Countries served" },
  { end: 100, suffix: "%", label: "Client satisfaction" },
  { end: 24, prefix: "<", suffix: "h", label: "First response" },
];

function HeroStatus() {
  const now = useNow(30000);
  const open = now ? isOpen(now) : true;
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${open ? "bg-green" : "bg-amber"}`} />
      </span>
      {open ? "Team online" : "Team offline"}
    </span>
  );
}

function PktClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--:--"}</span>;
}

const words = ["business", "startup", "store", "clinic", "agency"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid align-bottom">
      {/* reserve width of the longest word so the line doesn't jump */}
      <span className="invisible col-start-1 row-start-1">business.</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "45%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease }}
          className="text-electric col-start-1 row-start-1 justify-self-start"
        >
          {words[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const toasts = [
  { icon: Rocket, title: "Deploy succeeded", meta: "wanderblaze.app · 42s", tone: "text-green", pos: "-left-6 top-24 xl:-left-24", float: "float-a", delay: 1.2 },
  { icon: MessageSquarePlus, title: "New project request", meta: "Dubai, UAE · just now", tone: "text-brand", pos: "-right-6 top-10 xl:-right-24", float: "float-b", delay: 1.5 },
  { icon: Bot, title: "AI agent finished", meta: "128 tasks automated", tone: "text-violet", pos: "-left-6 bottom-36 xl:-left-20", float: "float-b", delay: 1.8 },
  { icon: Gauge, title: "Lighthouse 98", meta: "Performance · SEO · A11y", tone: "text-amber", pos: "-right-6 bottom-44 xl:-right-20", float: "float-a", delay: 2.1 },
];

function FloatingToasts() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      {toasts.map((t) => {
        const Icon = t.icon;
        return (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: t.delay, ease }}
            className={`absolute ${t.pos}`}
          >
            <div className={`glass-strong ${t.float} flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5 text-left`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 ${t.tone}`}>
                <Icon size={17} />
              </span>
              <span>
                <span className="block text-[13px] font-medium text-text-1">{t.title}</span>
                <span className="block font-mono text-[11px] text-text-3">{t.meta}</span>
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-drift absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-brand/20 blur-[120px]" />
        <div className="aurora-drift-2 absolute right-[6%] top-[8%] h-[460px] w-[460px] rounded-full bg-indigo/25 blur-[130px]" />
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      </div>

      <div className="container-x relative text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <Link
            href="/services/ai-automation"
            className="ring-conic group inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-1.5 text-sm text-text-2 backdrop-blur transition-colors hover:text-text-1"
          >
            <Sparkles size={14} className="text-brand" />
            <span>
              New: <span className="text-text-1">AI agents & workflow automation</span>
            </span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,6.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
        >
          <span className="text-silver">We build software</span>
          <br />
          <span className="text-electric">that scales your </span>
          <RotatingWord />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mx-auto mt-7 max-w-2xl text-lg text-text-2 sm:text-xl"
        >
          Web platforms, AI automation and mobile apps, engineered in Pakistan, shipped to clients across the Gulf,
          Europe, North America and Australia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/contact" data-magnetic className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px] sm:w-auto">
            Book a free call
            <ArrowRight size={16} />
          </Link>
          <Link href="/projects" data-magnetic className="btn-ghost inline-flex w-full items-center justify-center rounded-xl px-7 py-3.5 text-[15px] font-medium sm:w-auto">
            Explore our work
          </Link>
        </motion.div>

        {/* Global delivery console */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease }}
          className="relative mx-auto mt-16 max-w-6xl lg:mt-20"
        >
          <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(56,189,248,0.18),transparent_70%)]" />
          <FloatingToasts />
          <div data-tilt="3" className="tilt ring-conic overflow-hidden rounded-2xl bg-surface/60 ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(56,189,248,0.35)] backdrop-blur-xl sm:rounded-3xl">
            {/* window bar */}
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-left sm:px-6">
              <div className="flex items-center gap-3">
                <div className="hidden gap-1.5 sm:flex">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-xs text-text-2">elevare / global-delivery</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[11px] text-text-3 sm:text-xs">
                <span className="hidden sm:flex">
                  <HeroStatus />
                </span>
                <span>
                  PKT <PktClock />
                </span>
              </div>
            </div>

            {/* map */}
            <div className="relative px-2 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-8">
              <GlobalMap />
            </div>

            {/* stats */}
            <dl className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col-reverse px-5 py-5 text-left sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-border`}
                >

                  <dt className="mt-1 text-sm text-text-3">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight text-text-1 sm:text-4xl">
                    {s.prefix && <span className="text-brand">{s.prefix}</span>}
                    <CountUp end={s.end} duration={2.2} enableScrollSpy scrollSpyOnce />
                    <span className="text-brand">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
