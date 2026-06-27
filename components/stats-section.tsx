"use client";

import { AnimatedNumber } from "@/components/ui/animated-number";

export function StatsSection() {
  const stats = [
    { value: 200, suffix: "+", label: "Projects delivered" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 5, suffix: "+", label: "Years of expertise" },
    { value: 30, suffix: "+", label: "Industries served" },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="bg-[#161B24] border border-white/5 rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center justify-center text-center ${index > 1 ? "pt-8 md:pt-0" : ""} ${index === 1 ? "pt-0 md:pt-0" : ""}`}>
              <div className="text-4xl md:text-5xl font-semibold text-[#38BDF8] mb-2 tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-400 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
