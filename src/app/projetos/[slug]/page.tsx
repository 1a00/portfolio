import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from "@/components/icons";
import { MediaFrame } from "@/components/media-frame";
import {
  ButtonLink,
  ChipList,
  Container,
  Eyebrow,
  JsonLd,
  LiveBadge,
} from "@/components/ui";
import {
  type Shot,
  caseStudy,
  getNextProject,
  getProject,
  person,
  projects,
  ui,
} from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.name}: ${caseStudy.eyebrow.toLowerCase()}`,
    description: project.summary,
    path: `/projetos/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const path = `/projetos/${project.slug}`;
  const wideShots = project.gallery.filter((shot) => isWide(shot));
  const tallShots = project.gallery.filter((shot) => !isWide(shot));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": absoluteUrl(`${path}#projeto`),
        name: project.name,
        description: project.summary,
        url: project.url,
        mainEntityOfPage: absoluteUrl(path),
        image: absoluteUrl(project.cover.src.src),
        inLanguage: "pt-BR",
        keywords: project.stack.join(", "),
        creator: {
          "@type": "Person",
          "@id": absoluteUrl("/#pessoa"),
          name: person.fullName,
          url: absoluteUrl("/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: ui.home, item: absoluteUrl("/") },
          { name: ui.projects, item: absoluteUrl("/#projetos") },
          { name: project.name, item: absoluteUrl(path) },
        ].map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...crumb,
        })),
      },
    ],
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      <Container className="pt-10 md:pt-16">
        <nav aria-label={ui.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-2 text-body-sm text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                {ui.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#projetos" className="hover:text-ink">
                {ui.projects}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {project.name}
            </li>
          </ol>
        </nav>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{caseStudy.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw+1rem,4.25rem)] leading-none font-bold tracking-[-0.02em]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-subheading">{project.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={project.url}
                external
                icon={<ArrowUpRightIcon />}
              >
                {ui.visitCta}
              </ButtonLink>
              <ButtonLink href="/#projetos" variant="outline">
                {ui.backToProjects}
              </ButtonLink>
            </div>
          </div>

          <dl className="grid gap-5 rounded-card bg-surface-1 p-6 text-body-sm">
            <div>
              <dt className="text-muted">{caseStudy.site}</dt>
              <dd className="mt-1">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-link hover:underline hover:underline-offset-4"
                >
                  {project.domain}
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">{caseStudy.stack}</dt>
              <dd className="mt-1 font-medium text-ink">
                {project.stack.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{caseStudy.status}</dt>
              <dd className="mt-2">
                <LiveBadge />
              </dd>
            </div>
          </dl>
        </header>
      </Container>

      <Container className="mt-12 md:mt-16">
        <MediaFrame
          shot={project.cover}
          sizes="(min-width: 1344px) 1280px, 100vw"
          priority
          domain={project.domain}
        />
      </Container>

      <Container className="mt-16 flex flex-col gap-14 md:mt-24 md:gap-20">
        <StorySection index={1} title={caseStudy.problem}>
          {project.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </StorySection>

        <StorySection index={2} title={caseStudy.solution}>
          {project.solution.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </StorySection>

        <StorySection index={3} title={caseStudy.built}>
          <ul className="reveal-group flex flex-col gap-3">
            {project.built.map((item) => (
              <li key={item} className="flex gap-3 rounded-chip bg-surface-1 p-4">
                <CheckIcon className="mt-1 shrink-0 text-link" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </StorySection>

        <StorySection index={4} title={caseStudy.stack}>
          <ChipList items={project.stack} />
        </StorySection>
      </Container>

      <section aria-labelledby="telas-titulo" className="mt-20 md:mt-28">
        <Container>
          <h2
            id="telas-titulo"
            className="reveal text-heading font-bold md:text-heading-lg"
          >
            {caseStudy.screens}
          </h2>

          <div className="reveal-group mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <figure>
              <div
                role="region"
                aria-label={`${caseStudy.fullPage}. ${caseStudy.fullPageHint}`}
                tabIndex={0}
                className="h-[480px] overflow-y-auto overscroll-contain rounded-card border border-line bg-surface-2 md:h-[650px]"
              >
                <Image
                  src={project.fullPage.src}
                  alt={project.fullPage.alt}
                  sizes="(min-width: 1344px) 990px, (min-width: 1024px) 70vw, 100vw"
                  quality={85}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-body-sm text-muted">
                {caseStudy.fullPage}. {caseStudy.fullPageHint}
              </figcaption>
            </figure>

            <figure className="mx-auto w-full max-w-[300px]">
              <MediaFrame
                shot={project.mobile}
                sizes="300px"
              />
              <figcaption className="mt-3 text-body-sm text-muted">
                {caseStudy.mobile}
              </figcaption>
            </figure>
          </div>

          {wideShots.length > 0 && (
            <div className="reveal-group mt-6 grid gap-6 md:grid-cols-2">
              {wideShots.map((shot) => (
                <GalleryFigure
                  key={shot.alt}
                  shot={shot}
                  sizes="(min-width: 1344px) 640px, (min-width: 768px) 50vw, 100vw"
                />
              ))}
            </div>
          )}

          {tallShots.length > 0 && (
            <div className="reveal-group mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {tallShots.map((shot) => (
                <GalleryFigure
                  key={shot.alt}
                  shot={shot}
                  sizes="(min-width: 1344px) 310px, (min-width: 768px) 25vw, 50vw"
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      <Container className="mt-20 md:mt-28">
        <Link
          href={`/projetos/${next.slug}`}
          className="reveal group grid items-center gap-6 rounded-card bg-surface-1 p-6 transition-colors duration-200 hover:bg-surface-2 md:grid-cols-[1fr_auto] md:p-10"
        >
          <span>
            <Eyebrow>{caseStudy.next}</Eyebrow>
            <span className="mt-3 block text-heading font-bold text-ink md:text-heading-lg">
              {next.name}
            </span>
            <span className="mt-2 block max-w-2xl">{next.summary}</span>
          </span>
          <span className="flex size-14 items-center justify-center rounded-pill bg-accent text-white transition-colors duration-200 group-hover:bg-accent-hover">
            <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Container>
    </article>
  );
}

function StorySection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="reveal grid gap-4 border-t border-line pt-8 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:pt-10">
      <h2 className="text-heading-sm font-bold md:text-heading">
        <span className="mb-2 block text-caption font-medium tracking-[0.08em] text-link">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="flex max-w-3xl flex-col gap-4 text-subheading">
        {children}
      </div>
    </section>
  );
}

function GalleryFigure({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <figure>
      <MediaFrame shot={shot} sizes={sizes} />
      {shot.caption && (
        <figcaption className="mt-3 text-body-sm text-muted">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}

function isWide(shot: Shot) {
  return shot.src.width > shot.src.height;
}
