"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared header for inner pages: pill label, two-tone headline, intro. */
export function PageHero({
  label,
  title,
  highlight,
  description,
  children,
}: {
  label: string;
  title: string;
  highlight?: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[20%] h-[340px] w-[340px] rounded-full bg-brand/15 blur-[110px]" />
        <div className="absolute right-[10%] top-[10%] h-[380px] w-[380px] rounded-full bg-indigo/20 blur-[120px]" />
      </div>
      <div className="container-x text-center">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="text-label">
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" />
          {label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mx-auto mt-6 max-w-4xl"
        >
          <span className="text-silver">{title}</span>
          {highlight && (
            <>
              <br />
              <span className="text-electric">{highlight}</span>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-2 sm:text-xl"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28, ease }} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
