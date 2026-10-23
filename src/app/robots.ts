import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Deploys de preview da Vercel não devem ser indexados.
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
