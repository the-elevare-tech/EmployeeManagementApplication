"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Light fade-in on every route change.
 * Pure CSS on purpose: a JS exit/enter animation (AnimatePresence) can get
 * stuck at opacity 0 with the App Router, leaving a blank page until refresh.
 * A CSS animation always runs to the end, even before JavaScript loads.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter flex min-h-screen flex-col">
      {children}
    </div>
  );
}
