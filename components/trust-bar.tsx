"use client";

import { SectionTag } from "@/components/ui/section-tag";

export function TrustBar() {
  const logos = [
    "Client Logo 1",
    "Client Logo 2",
    "Client Logo 3",
    "Client Logo 4",
    "Client Logo 5",
  ];

  return (
    <section className="border-y border-white/5 bg-[#161B24]/30 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <SectionTag className="mb-0 text-slate-500 font-semibold tracking-wider whitespace-nowrap shrink-0">
          Trusted by businesses worldwide
        </SectionTag>
        <div className="relative flex overflow-hidden w-full mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)">
          <div className="flex animate-marquee gap-8 md:gap-16 whitespace-nowrap py-2">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div 
                key={i} 
                className="h-10 px-6 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-400 font-medium text-sm md:text-base opacity-70 hover:opacity-100 transition-opacity shrink-0"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
