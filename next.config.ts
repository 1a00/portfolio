import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // CSS do Tailwind inline no <head>: sem requisição bloqueante na 1ª visita.
    inlineCss: true,
  },
  images: {
    // 85 nos prints dos projetos; 75 é o padrão do next/image.
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
