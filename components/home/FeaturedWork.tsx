"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug, type Project } from "@/lib/projects";

const featured: { slug: string; image: string; pos?: string; span: string }[] = [
  { slug: "uae-visa-consultancy-website", image: "/projects/uae-visa-cover.webp", pos: "top", span: "lg:col-span-7" },
  { slug: "tyre-ecommerce-platform", image: "/projects/tyre-cover.webp", span: "lg:col-span-5" },
  { slug: "ai-research-automation-platform", image: "/projects/r.png", pos: "top", span: "lg:col-span-5" },
  { slug: "deepfake-detection", image: "/projects/deepfake-detection.png", span: "lg:col-span-7" },
]

function WorkCard({ project, image, pos }: { project: Project; image: string; pos?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} data-tilt="3" className="tilt card group flex h-full flex-col overflow-hidden rounded-3xl p-3">
      {/* browser frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-ink">
        <div className="flex items-center gap-1.5 border-b border-border px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-0.5 font-mono text-[11px] text-text-3">
            {project.confidential ? "client-project.app" : `${project.slug}.app`}
          </span>
        </div>
        <div className="relative h-56 overflow-hidden sm:h-72 lg:h-80">
          {!project.confidential && (
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-text-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              In-house product
            </span>
          )}
          {project.confidential && project.client && (
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-text-1 backdrop-blur">
              {project.client.code ? <img src={`https://flagcdn.com/20x15/${project.client.code}.png`} alt="" width={14} height={10} className="rounded-[2px]" /> : <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
              Client project · {project.client.country}
            </span>
          )}
          <Image
            src={image}
            alt={project.title}
            fill
            sizes="(max-width:1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ objectPosition: pos ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-brand">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-2 text-xl text-text-1 sm:text-[1.375rem]">{project.title}</h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-2 transition-all group-hover:border-brand/50 group-hover:bg-brand/10 group-hover:text-brand">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-[15px] text-text-2">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 text-xs text-text-2">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function FeaturedWork() {
  const items = featured
    .map((f) => ({ ...f, project: getProjectBySlug(f.slug) }))
    .filter((f): f is typeof f & { project: Project } => Boolean(f.project));

  return (
    <section className="relative overflow-x-clip py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo/10 blur-[140px]" />
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-label">Selected work</span>
            <h2 className="mt-5">
              <span className="text-silver">Products we&apos;ve shipped</span>
            </h2>
            <p className="mt-4 text-lg text-text-2">AI platforms, web apps and dashboards built for founders and growing teams.</p>
          </div>
          <Link href="/projects" className="btn-ghost inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-5 py-3 text-[15px] font-medium md:self-auto">
            View all projects
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {items.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={it.span}
            >
              <WorkCard project={it.project} image={it.image} pos={it.pos} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
