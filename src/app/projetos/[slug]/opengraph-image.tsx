import { caseStudy, getProject, person, projects } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${caseStudy.eyebrow} de um projeto de ${person.displayName}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects[0];

  return ogImage({
    eyebrow: `${caseStudy.eyebrow} · ${project.domain}`,
    title: project.name,
    subtitle: project.stack.join(" · "),
    footer: `${person.displayName} · ${person.role}`,
  });
}
