"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/ui/Logo";
import { CursorGlow } from "@/components/layout/CursorGlow";

type PageLoaderProps = {
  onFinish?: () => void;
};

export default function PageLoader({ onFinish }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const duration = 2500;
    const intervalTime = 50;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish?.(), 150);
          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg text-text-1 overflow-hidden">
      <CursorGlow />

      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-glow blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-faint blur-[140px]" />

      <div className="relative z-10 text-center px-6">
        <div className="mb-10 flex justify-center">
          <Logo size={52} variant="nav" />
        </div>

        <p className="mb-8 text-text-2">Preparing your experience...</p>

        <div className="mx-auto w-80 h-2 rounded-full bg-surface-2 overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-brand">{Math.round(progress)}%</p>
      </div>
    </div>,
    document.body
  );
}
