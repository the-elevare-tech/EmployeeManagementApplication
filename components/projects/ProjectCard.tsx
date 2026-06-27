"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const accentColor = project.accentColor;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group bg-surface border border-white/8 rounded-xl overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        {project.preview.type === "image" ? (
          <Image
            src={project.preview.src}
            alt={project.preview.alt}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={project.preview.poster}
            className="w-full h-full object-cover"
          >
            <source src={project.preview.src} />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: `${accentColor}33`,
              color: accentColor,
              border: `1px solid ${accentColor}55`,
            }}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 text-xs text-white/50">{project.year}</div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-brand transition-colors">
          {project.title}
        </h3>
        <p className="text-text-2 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-surface-2 text-text-2">
              {t}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand mt-auto">
          View details
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
