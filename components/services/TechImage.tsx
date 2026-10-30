"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Presents any image in the Elevare "HUD" treatment:
 * duotone in brand colours, grid overlay, corner brackets, scanning line,
 * and (optionally) a real project screenshot floating in a browser frame.
 */
export function TechImage({
  image,
  shot,
  shotLabel,
  label,
  className = "",
  priority = false,
  compact = false,
}: {
  image?: string;
  shot: string;
  shotLabel?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  compact?: boolean;
}) {
  const bg = image ?? shot;
  return (
    <div className={`group/ti relative isolate overflow-hidden rounded-3xl border border-white/10 bg-ink ${className}`}>
      {/* duotone background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-indigo to-[#1e1b4b]" />
      <Image
        src={bg}
        alt=""
        fill
        priority={priority}
        sizes="(max-width:1024px) 100vw, 50vw"
        className="object-cover opacity-60 mix-blend-luminosity grayscale transition-transform duration-[1.2s] ease-out group-hover/ti:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

      {/* scanning line */}
      <div aria-hidden className="scanline pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand/15 to-transparent" />

      {/* corner brackets */}
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
        <span key={c} aria-hidden className={`absolute h-4 w-4 border-brand/70 ${c}`} />
      ))}

      {label && (
        <span className="absolute left-6 top-5 rounded-md border border-white/10 bg-ink/60 px-2 py-0.5 font-mono text-[10.5px] text-brand backdrop-blur">
          {label}
        </span>
      )}

      {/* floating project screenshot */}
      <div
        className={`absolute overflow-hidden rounded-xl border border-white/15 bg-ink shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(56,189,248,0.4)] transition-transform duration-700 ease-out group-hover/ti:-translate-y-1 ${
          compact ? "bottom-4 right-4 w-[62%]" : "bottom-6 right-6 w-[64%] sm:bottom-8 sm:right-8"
        }`}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-surface-2/80 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-coral/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-green/80" />
          {shotLabel && <span className="ml-1.5 truncate font-mono text-[9.5px] text-text-3">{shotLabel}</span>}
        </div>
        <div className="relative aspect-[16/10]">
          <Image src={shot} alt={shotLabel ?? ""} fill sizes="(max-width:1024px) 70vw, 32vw" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

/** Tech logo (served locally from /public/icons) with a monogram fallback. */
export function StackLogo({ name, icon, size = 20 }: { name: string; icon: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex items-center justify-center rounded-md bg-white/[0.06] font-mono text-[10px] text-text-2" style={{ width: size, height: size }}>
        {name[0]}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/icons/${icon}.svg`} alt="" width={size} height={size} loading="lazy" style={{ width: size, height: size }} onError={() => setFailed(true)} />
  );
}
