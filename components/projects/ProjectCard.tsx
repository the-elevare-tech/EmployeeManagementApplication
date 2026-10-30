"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} data-tilt="5" className="tilt card group flex h-full flex-col overflow-hidden rounded-3xl p-2.5">
      <div className="overflow-hidden rounded-2xl border border-border bg-ink">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 truncate font-mono text-[10.5px] text-text-3">{project.confidential ? "client-project.app" : `${project.slug}.app`}</span>
        </div>
        <div className="relative h-48 overflow-hidden">
          {!project.confidential && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-text-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              In-house product
            </span>
          )}
          {project.confidential && project.client && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-text-1 backdrop-blur">
              {project.client.code ? <img src={`https://flagcdn.com/20x15/${project.client.code}.png`} alt="" width={14} height={10} className="rounded-[2px]" /> : <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
              Client project · {project.client.country}
            </span>
          )}
          {project.preview.type === "image" ? (
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          ) : (
            <video autoPlay muted loop playsInline poster={project.preview.poster} className="h-full w-full object-cover">
              <source src={project.preview.src} />
            </video>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col px-2.5 pt-4 pb-2.5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-brand">
            {project.category} · {project.year}
          </p>
          <ArrowUpRight size={17} className="shrink-0 text-text-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
        <h3 className="mt-2 text-[1.0625rem] font-medium text-text-1">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-grow text-sm text-text-2">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 text-[11px] text-text-2">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
