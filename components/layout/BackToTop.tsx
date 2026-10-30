"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Floating glass button with a scroll-progress ring; appears after scrolling down. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,16,34,0.8)] text-text-1 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl md:h-14 md:w-14"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="btt-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#38BDF8" />
                <stop offset="1" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp size={20} className="relative transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
