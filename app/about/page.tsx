"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Target, Eye, Gem, ScanEye, Zap, Handshake, Lightbulb, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { GlobalMap } from "@/components/home/GlobalMap";
import { StatsSection } from "@/components/home/StatsSection";
import { CTAStrip } from "@/components/home/CTAStrip";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";
import { OFFICES } from "@/lib/offices";
import { OfficeMapCard } from "@/components/layout/OfficeCard";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { end: 2025, label: "Founded", plain: true },
  { end: 15, suffix: "+", label: "Projects shipped" },
  { end: 3, label: "Continents served" },
  { end: 10, label: "Service lines" },
];

type Milestone = {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  kind: "company" | "client" | "product" | "next";
  href?: string;
};

const milestones: Milestone[] = [
  {
    date: "Aug 2025",
    title: "Elevare Tech is founded",
    desc: "Elevare Tech is established in Faisalabad, Pakistan. The company launches with its own internal operations platform covering administration, HR, team leads and interns.",
    tags: ["Next.js", "Internal platform"],
    kind: "company",
  },
  {
    date: "Sep 2025",
    title: "Company website and first service lines",
    desc: "Elevare Tech launches its website and first service lines: web development, AI automation, UI/UX design, mobile apps and data analytics.",
    tags: ["Website", "Brand"],
    kind: "company",
  },
  {
    date: "Sep to Oct 2025",
    title: "First international client in the USA",
    desc: "Email marketing automation for a US-based Shopify retailer. The event-driven system recovered 12% of abandoned carts and reached an 18% repeat purchase rate.",
    tags: ["Automation", "Zapier", "Klaviyo"],
    kind: "client",
    href: "/projects/shopify-email-marketing-automation",
  },
  {
    date: "2025",
    title: "In-house AI lead-generation platform",
    desc: "An automated pipeline using n8n and large language models to discover, enrich and organise B2B leads across seven international markets.",
    tags: ["n8n", "LLMs", "Lead generation"],
    kind: "product",
  },
  {
    date: "Nov 2025",
    title: "Financial modelling for an international manufacturer",
    desc: "A financial model and KPI dashboard for a steel fabrication company, covering P&L, cash flow, a probability-weighted sales pipeline and scenario analysis.",
    tags: ["Data & analytics", "Excel", "Power BI-ready"],
    kind: "client",
    href: "/projects/financial-model-kpi-dashboard",
  },
  {
    date: "Nov 2025 to Feb 2026",
    title: "E-commerce platform for a company in France",
    desc: "A complete online store for a tyre retailer, with a Next.js storefront, a Django backend and an admin panel used by the client's team to manage daily operations.",
    tags: ["E-commerce", "Next.js", "Django"],
    kind: "client",
    href: "/projects/tyre-ecommerce-platform",
  },
  {
    date: "2025 to 2026",
    title: "Expansion of our AI practice",
    desc: "Development of in-house AI products, including deepfake detection with explainable AI, a multi-agent research platform and an enterprise knowledge assistant.",
    tags: ["AI agents", "RAG", "Computer vision"],
    kind: "product",
    href: "/projects?tab=in-house",
  },
  {
    date: "Sep to Oct 2026",
    title: "Multilingual platform for a UAE consultancy",
    desc: "A WordPress website rebuilt as a Next.js platform in eight languages, including Arabic, with a content admin panel and automated translation. Delivered and handed over.",
    tags: ["Web", "i18n", "Automation"],
    kind: "client",
    href: "/projects/uae-visa-consultancy-website",
  },
  {
    date: "Oct 2026",
    title: "AI platform engineering for clients",
    desc: "Elevare Tech begins backend and AI engine development for an AI platform client and expands to ten service lines.",
    tags: ["AI engineering", "Backend", "DevOps"],
    kind: "company",
  },
  {
    date: "Next",
    title: "Growing the team and AI practice",
    desc: "Expanding our engineering team in Pakistan and our work in AI agents and automation for international clients.",
    tags: ["Hiring", "AI"],
    kind: "next",
  },
];

const KIND = {
  company: { label: "Company", cls: "border-brand/40 bg-brand/10 text-brand" },
  client: { label: "Client project", cls: "border-green/40 bg-green/10 text-green" },
  product: { label: "In-house product", cls: "border-violet/40 bg-violet/10 text-violet" },
  next: { label: "What's next", cls: "border-white/15 bg-white/5 text-text-2" },
};

const chapters = [
  {
    title: "Who we are",
    body: [
      "Elevare Tech is a software development company with offices in Lahore, Pakistan and San Francisco, USA. Founded in August 2025 by two software engineers, we design, build and maintain websites, web applications, mobile apps and AI systems for businesses in North America, Europe and the Middle East.",
    ],
  },
  {
    title: "Why we exist",
    body: [
      "Growing businesses are often left choosing between large agencies with slow, layered communication and individual freelancers who are hard to rely on after launch. Elevare Tech was built as the alternative: a focused engineering team that clients work with directly, backed by clear processes and long-term support.",
    ],
  },
  {
    title: "How we work",
    body: [
      "Every engagement starts with a written scope and a fixed price. Clients see working software every week and speak directly with the engineers building it. Our name comes from the Latin elevare, meaning to lift up, which is what we aim to do for every business we work with.",
    ],
  },
];



const values = [
  { icon: Gem, title: "Quality", desc: "We don't ship until it's right." },
  { icon: ScanEye, title: "Transparency", desc: "No hidden costs, no surprises." },
  { icon: Zap, title: "Speed", desc: "We move fast without cutting corners." },
  { icon: Handshake, title: "Partnership", desc: "Your success is our success." },
  { icon: Lightbulb, title: "Innovation", desc: "Always learning, always improving." },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="We build technology that"
        highlight="moves businesses forward."
        description="Elevare Tech is a full-service software development company with offices in Lahore and San Francisco. We design, build and support websites, apps, AI systems and automation for businesses worldwide."
      >
        <div className="glass-strong mx-auto grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse px-5 py-5 ${i > 0 ? "sm:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-white/10`}>
              <dt className="mt-1 text-xs text-text-3">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight text-text-1 sm:text-3xl">
                {s.plain ? s.end : <CountUp end={s.end} duration={2} enableScrollSpy scrollSpyOnce />}
                {s.suffix && <span className="text-brand">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="text-label">Our story</span>
              <h2 className="mt-5">
                <span className="text-silver">Engineers first.</span>
                <br />
                <span className="text-electric">Partners always.</span>
              </h2>
              <p className="mt-5 text-text-2">
                A software development company built on direct communication, fixed pricing and dependable delivery.
              </p>
              <dl className="glass-strong mt-8 grid grid-cols-2 overflow-hidden rounded-2xl">
                {[
                  { k: "Founded", v: "Aug 2025" },
                  { k: "Offices", v: "Lahore · SF" },
                  { k: "Service lines", v: "10" },
                  { k: "Client regions", v: "3 continents" },
                ].map((x, i) => (
                  <div key={x.k} className={`p-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t" : ""} border-white/10`}>
                    <dt className="font-mono text-[11px] text-text-3">{x.k}</dt>
                    <dd className="mt-1 font-medium text-text-1">{x.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {chapters.map((c, i) => (
              <motion.article key={c.title} {...reveal} className="relative">
                <h3 className="text-2xl text-text-1">{c.title}</h3>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-text-2">
                  {c.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="text-label">What we do</span>
              <h2 className="mt-5">
                <span className="text-silver">Everything a business needs</span>{" "}
                <span className="text-electric">to build and grow with software</span>
              </h2>
            </div>
            <p className="text-lg text-text-2 lg:col-span-5">
              We plan, design, develop, launch and maintain digital products end to end. Clients come to us with an idea, a process
              to automate or an outdated system, and leave with software that is live, documented and supported.
            </p>
          </motion.div>

          {/* delivery model */}
          <motion.ol {...reveal} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
            {[
              { t: "Consult", d: "Understand your goals and define the right solution." },
              { t: "Design", d: "User flows, interfaces and prototypes you approve." },
              { t: "Build", d: "Engineering in weekly sprints with live demos." },
              { t: "Launch", d: "Deployment, testing, documentation and training." },
              { t: "Support", d: "Maintenance, monitoring and new features." },
            ].map((x, i) => (
              <li key={x.t} className={`bg-bg p-5 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <p className="mt-2 font-medium text-text-1">{x.t}</p>
                <p className="mt-1 text-sm text-text-2">{x.d}</p>
              </li>
            ))}
          </motion.ol>

          {/* services by category: Build on the left, the rest stacked on the right */}
          {(() => {
            const blurb: Record<string, string> = {
              Build: "Websites, platforms and applications engineered for performance and scale.",
              Design: "Research-led product and interface design that users understand instantly.",
              "AI & Data": "AI agents, automation, machine learning and analytics that save time and reveal insight.",
              Operate: "Hosting, deployment pipelines, monitoring and ongoing maintenance.",
            };
            const Group = ({ cat, ci }: { cat: string; ci: number }) => {
              const items = SERVICES.filter((x) => x.category === cat);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: ci * 0.08 }}
                  className="card h-full rounded-3xl p-6 sm:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl text-text-1">{cat}</h3>
                    <span className="font-mono text-xs text-text-3">{items.length} {items.length === 1 ? "service" : "services"}</span>
                  </div>
                  <p className="mt-2 text-[15px] text-text-2">{blurb[cat]}</p>
                  <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {items.map((sv) => {
                      const Icon = sv.icon;
                      return (
                        <li key={sv.slug}>
                          <Link href={`/services/${sv.slug}`} className="group flex items-start gap-3 py-3.5">
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-brand">
                              <Icon size={15} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium text-text-1 group-hover:text-brand">{sv.title}</span>
                              <span className="block text-sm text-text-2">{sv.summary}</span>
                            </span>
                            <ArrowUpRight size={16} className="mt-1 shrink-0 text-text-3 transition-colors group-hover:text-brand" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            };
            const [first, ...rest] = SERVICE_CATEGORIES;
            return (
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Group cat={first} ci={0} />
                <div className="flex flex-col gap-4">
                  {rest.map((c, i) => (
                    <Group key={c} cat={c} ci={i + 1} />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* who we work with */}
          <motion.div {...reveal} className="glass-strong mt-4 grid gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <h3 className="text-xl text-text-1">Who we work with</h3>
              <p className="mt-2 text-[15px] text-text-2">From first-time founders to established companies.</p>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                "Startups launching their first product",
                "Small and medium businesses going digital",
                "E-commerce and retail brands",
                "Consultancies and professional services",
                "Teams automating repetitive operations",
                "Companies replacing outdated software",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2 text-[15px] text-text-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                    <Check size={12} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <motion.div {...reveal} className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-label">Our journey</span>
            <h2 className="mt-5">
              <span className="text-silver">Our</span> <span className="text-electric">milestones</span>
            </h2>
            <p className="mt-4 text-lg text-text-2">Key moments in the growth of Elevare Tech since 2025.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {(["company", "client", "product"] as const).map((k) => (
                <span key={k} className={`rounded-full border px-3 py-1 text-xs ${KIND[k].cls}`}>
                  {KIND[k].label}
                </span>
              ))}
            </div>
          </motion.div>

          <ol className="relative mx-auto max-w-5xl">
            <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-brand via-indigo to-transparent md:left-1/2" />
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              const card = (
                <div className="card rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-brand">{m.date}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10.5px] ${KIND[m.kind].cls}`}>{KIND[m.kind].label}</span>
                  </div>
                  <h3 className="mt-3 text-lg text-text-1">{m.title}</h3>
                  <p className="mt-2 text-[15px] text-text-2">{m.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {m.tags.map((t) => (
                      <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-text-2">
                        {t}
                      </span>
                    ))}
                    {m.href && (
                      <a href={m.href} className="ml-auto text-sm text-brand hover:underline">
                        View project
                      </a>
                    )}
                  </div>
                </div>
              );
              return (
                <motion.li
                  key={m.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease }}
                  className={`relative grid grid-cols-[2rem_1fr] gap-4 pb-6 md:grid-cols-[1fr_3rem_1fr] md:gap-0 md:pb-8 ${i > 0 ? "md:-mt-20" : ""}`}
                >
                  <div className={`hidden md:block ${left ? "pr-8" : ""}`}>{left && card}</div>
                  <div className="relative flex justify-center">
                    <span
                      className={`relative z-10 mt-6 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        m.kind === "next" ? "border-dashed border-text-3 bg-bg" : "border-brand bg-bg shadow-[0_0_14px_rgba(56,189,248,0.7)]"
                      }`}
                    />
                  </div>
                  <div className={`md:pl-8 ${left ? "md:hidden" : ""}`}>{card}</div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {[
            { icon: Target, label: "Mission", text: "To deliver world-class technology solutions that empower businesses of all sizes to compete in the digital age." },
            { icon: Eye, label: "Vision", text: "A future where every business has access to cutting-edge technology built to their exact needs." },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.label} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="ring-conic card relative overflow-hidden rounded-3xl p-8 sm:p-10">
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-indigo text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.8)]">
                  <Icon size={22} />
                </span>
                <p className="mt-8 font-mono text-xs text-brand">{m.label}</p>
                <p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-text-1 sm:text-[1.75rem]">{m.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="container-x mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-tilt="8"
                className={`tilt card rounded-3xl p-6 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <Icon size={22} className="text-brand" />
                <h3 className="mt-6 text-lg text-text-1">{v.title}</h3>
                <p className="mt-1 text-sm text-text-2">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Offices + reach */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-label">
              <MapPin size={12} /> Our offices
            </span>
            <h2 className="mt-5">
              <span className="text-silver">Two offices.</span> <span className="text-electric">Clients worldwide.</span>
            </h2>
            <p className="mt-4 text-lg text-text-2">
              Our engineering team is based in Lahore, with a presence in San Francisco for our clients in North America.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {OFFICES.map((o) => (
              <motion.div key={o.id} {...reveal}>
                <OfficeMapCard office={o} height="h-64" />
              </motion.div>
            ))}
          </div>
          <motion.div {...reveal} className="glass-strong mt-4 rounded-3xl px-2 py-8 sm:px-10 sm:py-12">
            <GlobalMap />
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <CTAStrip />
    </>
  );
}
