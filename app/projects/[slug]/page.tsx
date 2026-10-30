import type { Metadata } from "next";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const image = project.preview.type === "image" ? project.preview.src : undefined;
  return {
    title: { absolute: `${project.title} | Elevare Tech` },
    description: project.desc,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} | Elevare Tech`, description: project.desc, url: `/projects/${project.slug}`, ...(image ? { images: [image] } : {}) },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
