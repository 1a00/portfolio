import type { Metadata } from "next";

import { person } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Usa o título como está, sem o sufixo " | Iago Silva". */
  absoluteTitle?: boolean;
};

/**
 * Metadados por página. O Next substitui (não mescla) openGraph e twitter
 * entre layout e página, então cada página monta os seus aqui.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${person.displayName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: person.displayName,
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
