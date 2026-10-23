import type { MetadataRoute } from "next";

import { projects } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projetos/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
