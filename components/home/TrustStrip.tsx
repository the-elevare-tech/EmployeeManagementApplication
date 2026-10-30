"use client";

const items = [
  { code: "pk", country: "Pakistan" },
  { code: "ae", country: "UAE" },
  { code: "sa", country: "Saudi Arabia" },
  { code: "gb", country: "United Kingdom" },
  { code: "us", country: "United States" },
  { code: "ca", country: "Canada" },
  { code: "au", country: "Australia" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-ink/40">
      <div className="container-x flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-12">
        <p className="shrink-0 text-sm text-text-3">Clients in seven countries</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <li key={item.code} className="inline-flex items-center gap-2.5 text-[15px] text-text-2">
              <img
                src={`https://flagcdn.com/24x18/${item.code}.png`}
                srcSet={`https://flagcdn.com/48x36/${item.code}.png 2x`}
                width={20}
                height={15}
                alt=""
                className="rounded-[2px] object-cover opacity-90"
                loading="lazy"
              />
              {item.country}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
