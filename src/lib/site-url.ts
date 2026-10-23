/**
 * Domínio público do site. Defina NEXT_PUBLIC_SITE_URL (ex.: https://iagosilva.dev).
 * Na Vercel, sem a variável, usa o domínio de produção do projeto.
 */
function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
