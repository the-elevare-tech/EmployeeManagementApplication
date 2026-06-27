"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { CTAStrip } from "@/components/home/CTAStrip";

interface ProjectDetailClientProps {
  slug: string;
}

export default function ProjectDetailClient({ slug }: ProjectDetailClientProps) {

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);
  const isMobileProject = project.filterCategory === "Mobile";
  return (
    <>
      <section className="pt-28 pb-12 px-6 lg:px-12 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger(0, 0.08)}>
          <motion.div variants={fadeUp}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-text-2 hover:text-brand text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to projects
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${project.accentColor}22`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}44`,
              }}
            >
              {project.category}
            </span>
            <span className="text-text-3 text-sm">{project.year}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-white mb-4">
            {project.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-2 text-lg leading-relaxed max-w-3xl">
            {project.longDesc}
          </motion.p>
        </motion.div>
      </section>

      <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          // className="relative rounded-xl overflow-hidden border border-border aspect-video bg-surface"
          className={
            isMobileProject
              ? "relative rounded-2xl overflow-hidden border border-border aspect-video bg-[#111827] max-w-3xl mx-auto"
              : "relative rounded-xl overflow-hidden border border-border aspect-video bg-surface"
          }
        >
          {project.preview.type === "image" ? (
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              fill
              className={
                isMobileProject
                  ? "object-contain p-6"
                  : "object-cover object-top"
              }
              priority
              sizes="(max-width:1024px) 100vw, 1024px"
            />
          ) : (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={project.preview.src} />
            </video>
          )}
        </motion.div>
      </section>

      <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {project.results.map((r) => (
            <motion.div
              key={r.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card bg-surface border border-border rounded-xl p-6 text-center"
            >
              <p className="text-2xl font-bold mb-1" style={{ color: project.accentColor }}>
                {r.value}
              </p>
              <p className="text-text-2 text-sm">{r.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-white text-xl mb-4">Key highlights</h2>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="text-text-2 text-sm flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: project.accentColor }} />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-white text-xl mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-surface-2 text-text-1 border border-border">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 1 && (
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-16">
          <h2 className="text-white text-xl mb-6">Gallery</h2>
          <div className="grid md:grid-cols-2 gap-4">
          {project.gallery.map((item, i) => (
  <div
    key={i}
    className={
      isMobileProject
        ? "relative aspect-video rounded-2xl overflow-hidden border border-border bg-[#111827]"
        : "relative aspect-video rounded-xl overflow-hidden border border-border"
    }
  >
    {item.type === "image" ? (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className={
          isMobileProject
            ? "object-contain p-4"
            : "object-cover object-top"
        }
        sizes="50vw"
      />
    ) : (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        poster={item.poster}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    )}
  </div>
))}
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-16">
        <h2 className="text-white text-xl mb-6">More projects</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="card group rounded-xl border border-border bg-surface overflow-hidden"
            >
              <div className="relative h-32">
                {p.preview.type === "image" ? (
                  <Image
                    src={p.preview.src}
                    alt={p.title}
                    fill
                    className="object-cover object-top"
                    sizes="33vw"
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={p.preview.src} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-medium group-hover:text-brand transition-colors">{p.title}</p>
                <span className="text-brand text-xs inline-flex items-center gap-1 mt-2">
                  View <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTAStrip />
    </>
  );
}
