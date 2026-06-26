import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/intern",
        "/intern/",
        "/hr",
        "/hr/",
        "/teamlead",
        "/teamlead/",
        "/login",
        "/login/",
      ],
    },
    sitemap: "https://www.elevaretech.site/sitemap.xml",
  };
}
