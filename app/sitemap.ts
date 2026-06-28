import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const baseUrl = "https://www.elevaretech.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/projects", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/careers", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/support/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/support/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const staticEntries = publicPages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const projectEntries = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
