"use client";

const items = [
  { code: "pk", country: "Pakistan" },
  { code: "ae", country: "UAE" },
  { code: "gb", country: "United Kingdom" },
  { code: "us", country: "United States" },
  { code: "ca", country: "Canada" },
  { code: "sa", country: "Saudi Arabia" },
  { code: "au", country: "Australia" },
];

const marqueeItems = [...items, ...items];

export function TrustStrip() {
  return (
    <section className="relative border-y border-white/6 bg-bg overflow-hidden py-5">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-white/25 mb-3 relative z-0">
        Trusted by businesses across
      </p>

      <div
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0F1117, transparent)" }}
        aria-hidden
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0F1117, transparent)" }}
        aria-hidden
      />

      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee-trust whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeItems.map((item, i) => (
            <div
              key={`${item.code}-${i}`}
              className="inline-flex items-center gap-2.5 mx-5 px-4 py-1.5 rounded-full border border-white/6 bg-white/[0.03] shrink-0"
            >
              <img
                src={`https://flagcdn.com/24x18/${item.code}.png`}
                srcSet={`https://flagcdn.com/48x36/${item.code}.png 2x`}
                width={24}
                height={18}
                alt={`${item.country} flag`}
                className="rounded-[2px] object-cover"
                loading="lazy"
              />
              <span className="text-sm font-medium text-white/55">{item.country}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
