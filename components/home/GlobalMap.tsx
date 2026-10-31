"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { BORDERS, LAND, MAP_H, MAP_W, project } from "@/lib/worldMap";
import * as SHAPES from "@/lib/countryShapes";
import { OFFICES } from "@/lib/offices";

type City = { id: string; name: string; country: string; lon: number; lat: number; flag: string };

/* Where our clients are. Real longitude / latitude. */
const CITIES: City[] = [
  { id: "dubai", name: "Dubai", country: "UAE", lon: 55.27, lat: 25.2, flag: "ae" },
  { id: "riyadh", name: "Riyadh", country: "Saudi Arabia", lon: 46.72, lat: 24.71, flag: "sa" },
  { id: "london", name: "London", country: "United Kingdom", lon: -0.12, lat: 51.5, flag: "gb" },
  { id: "new-york", name: "New York", country: "United States", lon: -74.0, lat: 40.7, flag: "us" },
  { id: "toronto", name: "Toronto", country: "Canada", lon: -79.38, lat: 43.65, flag: "ca" },
  { id: "sydney", name: "Sydney", country: "Australia", lon: 151.2, lat: -33.87, flag: "au" },
  { id: "karachi", name: "Karachi", country: "Pakistan", lon: 67.0, lat: 24.86, flag: "pk" },
  { id: "islamabad", name: "Islamabad", country: "Pakistan", lon: 73.05, lat: 33.68, flag: "pk" },
  { id: "faisalabad", name: "Faisalabad", country: "Pakistan", lon: 73.08, lat: 31.42, flag: "pk" },
];

const HUB = { lon: 73.08, lat: 31.42 }; // Faisalabad, where Elevare Tech started
const AUTOPLAY_MS = 2800;

const CLIENT_SHAPES = [SHAPES.AE, SHAPES.SA, SHAPES.GB, SHAPES.US, SHAPES.CA, SHAPES.AU];

/** Curved route that bows upward, like a flight path. Short local routes bow less. */
function arc(x: number, y: number, hx: number, hy: number) {
  const mx = (x + hx) / 2;
  const my = (y + hy) / 2;
  const dist = Math.hypot(hx - x, hy - y);
  const lift = dist < 30 ? dist * 0.6 : dist * 0.3;
  return `M ${hx} ${hy} Q ${mx} ${my - lift} ${x} ${y}`;
}

export function GlobalMap({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const offices = useMemo(() => OFFICES.map((o) => { const [x, y] = project(o.lon, o.lat); return { ...o, x, y }; }), []);

  const { hub, cities } = useMemo(() => {
    const h = project(HUB.lon, HUB.lat);
    return {
      hub: h,
      cities: CITIES.map((c) => {
        const [x, y] = project(c.lon, c.lat);
        return { ...c, x, y, d: arc(x, y, h[0], h[1]), local: c.country === "Pakistan" };
      }),
    };
  }, []);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hovered || reduced) return;
    const id = setInterval(() => setAuto((i) => (i + 1) % CITIES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [inView, hovered, reduced]);

  const activeId = hovered ?? (reduced ? null : cities[auto].id);
  const active = cities.find((c) => c.id === activeId) ?? null;
  const pct = (x: number, y: number) => ({ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` });

  return (
    <div className={className}>
      <div
        ref={rootRef}
        role="group"
        aria-label="Map of Elevare Tech's offices in Lahore and San Francisco and our clients across the UAE, Saudi Arabia, the UK, the US, Canada and Australia"
        className="relative w-full select-none"
        style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
      >
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="pointer-events-none absolute inset-0 h-full w-full text-[#9fb4ff]" aria-hidden>
          <defs>
            <clipPath id={`${uid}-land`}>
              <path d={LAND} />
            </clipPath>
            <pattern id={`${uid}-dots`} width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="0.9" fill="currentColor" />
            </pattern>
            <linearGradient id={`${uid}-sweep`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#38BDF8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-route`} x1="0" x2="1">
              <stop offset="0" stopColor="#38BDF8" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
            <radialGradient id={`${uid}-hub`}>
              <stop offset="0" stopColor="#38BDF8" stopOpacity="0.7" />
              <stop offset="0.4" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* dotted continents + faint borders */}
          <path d={LAND} fill={`url(#${uid}-dots)`} fillOpacity="0.32" />
          <path d={LAND} fill="currentColor" fillOpacity="0.025" />
          <path d={BORDERS} fill="none" stroke="currentColor" strokeOpacity="0.09" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />

          {/* client countries, tinted */}
          {CLIENT_SHAPES.map((d, i) => (
            <path key={i} d={d} fill="#6366F1" fillOpacity="0.16" stroke="#818CF8" strokeOpacity="0.35" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
          ))}

          {/* Pakistan: home */}
          <path d={SHAPES.PK} fill="#38BDF8" fillOpacity="0.38" stroke="#7DD3FC" strokeWidth="1.2" vectorEffect="non-scaling-stroke" filter={`url(#${uid}-glow)`} />

          {/* light band sweeping across the land */}
          <g clipPath={`url(#${uid}-land)`}>
            <rect className="gr-sweep" x="0" y="0" width="320" height={MAP_H} fill={`url(#${uid}-sweep)`} />
          </g>

          {/* routes */}
          {cities.map((c) => (
            <path
              key={c.id}
              d={c.d}
              fill="none"
              stroke={`url(#${uid}-route)`}
              strokeOpacity={c.id === activeId ? 0.55 : 0.22}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {active && (
            <g key={active.id}>
              <path d={active.d} fill="none" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" className="gr-dash" vectorEffect="non-scaling-stroke" />
              <circle r="3.4" fill="#E0F2FE" filter={`url(#${uid}-glow)`}>
                <animateMotion dur="1.8s" repeatCount="indefinite" path={active.d} />
              </circle>
            </g>
          )}

          {/* city dots */}
          {cities.map((c) => {
            const on = c.id === activeId;
            const r = c.local ? 2.6 : 3.6;
            return (
              <g key={c.id} className="text-[#A5B4FC]">
                <circle cx={c.x} cy={c.y} r={on ? r * 2.6 : r * 2} fill="currentColor" fillOpacity={on ? 0.22 : 0.1} style={{ transition: "all 300ms" }} />
                {on && (
                  <circle cx={c.x} cy={c.y} r="5" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <animate attributeName="r" values="4;16" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={c.x} cy={c.y} r={on ? r * 1.3 : r} fill={on ? "#E0E7FF" : "currentColor"} style={{ transition: "all 300ms" }} />
              </g>
            );
          })}

          {/* office routes + markers */}
          {offices.map((o) => (
            <path
              key={`r-${o.id}`}
              d={`M ${hub[0]} ${hub[1]} Q ${(o.x + hub[0]) / 2} ${(o.y + hub[1]) / 2 - Math.max(18, Math.hypot(o.x - hub[0], o.y - hub[1]) * 0.3)} ${o.x} ${o.y}`}
              fill="none"
              stroke="#38BDF8"
              strokeOpacity="0.45"
              strokeWidth="1.4"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {offices.map((o) => (
            <g key={o.id}>
              {[0, 1.2].map((begin) => (
                <circle key={begin} cx={o.x} cy={o.y} r="6" fill="none" stroke="#38BDF8" strokeWidth="1.3">
                  <animate attributeName="r" values="6;26" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <rect x={o.x - 5} y={o.y - 5} width="10" height="10" rx="2.5" fill="#38BDF8" filter={`url(#${uid}-glow)`} transform={`rotate(45 ${o.x} ${o.y})`} />
              <rect x={o.x - 2.2} y={o.y - 2.2} width="4.4" height="4.4" rx="1" fill="#fff" transform={`rotate(45 ${o.x} ${o.y})`} />
            </g>
          ))}

          {/* origin hub (Faisalabad) */}
          <circle cx={hub[0]} cy={hub[1]} r="46" fill={`url(#${uid}-hub)`} />
          {[0, 1.2].map((begin) => (
            <circle key={begin} cx={hub[0]} cy={hub[1]} r="7" fill="none" stroke="#38BDF8" strokeWidth="1.4">
              <animate attributeName="r" values="7;34" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx={hub[0]} cy={hub[1]} r="6" fill="#38BDF8" filter={`url(#${uid}-glow)`} />
          <circle cx={hub[0]} cy={hub[1]} r="2.6" fill="#fff" />
        </svg>

        {/* hit areas for each city */}
        {cities.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={`${c.name}, ${c.country}`}
            aria-pressed={c.id === activeId}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(c.id)}
            onBlur={() => setHovered(null)}
            onClick={() => setHovered((cur) => (cur === c.id ? null : c.id))}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${c.local ? "size-5" : "size-8"}`}
            style={pct(c.x, c.y)}
          />
        ))}

        {/* tooltip */}
        {active && (
          <div
            key={active.id}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
            style={{
              left: `${Math.min(Math.max((active.x / MAP_W) * 100, 8), 92)}%`,
              top: `calc(${(active.y / MAP_H) * 100}% - 12px)`,
            }}
          >
            <span className="animate-in fade-in zoom-in-95 flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-surface-2/90 px-3 py-1.5 text-xs font-medium text-text-1 shadow-xl backdrop-blur">
              <img src={`https://flagcdn.com/20x15/${active.flag}.png`} alt="" width={16} height={12} className="rounded-[2px]" />
              {active.name}, {active.country}
            </span>
          </div>
        )}

        {/* office labels */}
        {offices.map((o) => (
          <div key={o.id} className="pointer-events-none absolute z-10" style={pct(o.x, o.y)}>
            <span
              className={`absolute flex w-max max-w-none items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/40 bg-ink/85 px-2 py-0.5 font-mono text-[9px] text-brand shadow-[0_0_24px_-4px_rgba(56,189,248,0.7)] backdrop-blur sm:gap-2 sm:px-3 sm:py-1 sm:text-[11px] ${
                o.id === "lahore" ? "bottom-3 left-2 sm:bottom-4 sm:left-3" : "bottom-3 right-2 sm:bottom-4 sm:right-3"
              }`}
            >
              <img src={`https://flagcdn.com/20x15/${o.flag}.png`} alt="" width={14} height={10} className="shrink-0 rounded-[2px]" />
              <span className="shrink-0 sm:hidden">{o.city}</span>
              <span className="hidden shrink-0 sm:inline">{o.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
