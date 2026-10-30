"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { openCommandMenu } from "@/components/layout/CommandMenu";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-drift absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent)] blur-2xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-sm text-brand">error 404 · route not found</p>
        <h1 className="mt-4 text-[clamp(6rem,18vw,12rem)] font-semibold leading-none tracking-[-0.06em]">
          <span className="text-electric">404</span>
        </h1>
        <h2 className="mt-2 text-3xl">
          <span className="text-silver">This page doesn&apos;t exist</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-2">You may have followed a broken link or mistyped the address.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" data-magnetic className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px]">
            Back to home <ArrowRight size={16} />
          </Link>
          <button type="button" onClick={openCommandMenu} className="btn-ghost inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-medium">
            <Search size={16} /> Search the site
          </button>
        </div>
      </motion.div>
    </section>
  );
}
