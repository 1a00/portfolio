import Link from "next/link";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { MediaFrame } from "@/components/media-frame";
import { ChipList, LiveBadge, cx } from "@/components/ui";
import { type Project, ui } from "@/content/site";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const href = `/projetos/${project.slug}`;
  const reversed = index % 2 === 1;

  // O primeiro card não tem revelação na rolagem: o print dele costuma ser o LCP.
  return (
    <article
      aria-labelledby={`projeto-${project.slug}`}
      className={cx(
        "grid items-center gap-6 rounded-card bg-surface-1 p-4 sm:p-6 lg:grid-cols-[55fr_45fr] lg:gap-12",
        index > 0 && "reveal",
      )}
    >
      {/* A imagem repete o link do título; fica fora da ordem de tabulação. */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cx("group block", reversed && "lg:order-2")}
      >
        <MediaFrame
          shot={project.cover}
          sizes="(min-width: 1344px) 700px, (min-width: 1024px) 52vw, 100vw"
          priority={index === 0}
          domain={project.domain}
          zoom
        />
      </Link>

      <div className={cx("px-2 pb-2 lg:px-0", reversed && "lg:order-1 lg:pl-6")}>
        <div className="flex items-center gap-3">
          <span className="text-caption font-medium tracking-[0.08em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <LiveBadge />
        </div>
        <h3
          id={`projeto-${project.slug}`}
          className="mt-4 text-heading font-bold tracking-[-0.01em]"
        >
          <Link href={href} className="hover:text-link">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 text-body md:text-subheading">{project.summary}</p>
        <ChipList items={project.stack} label={ui.stack} className="mt-5" />

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-link hover:underline hover:underline-offset-4"
          >
            {ui.caseStudyCta}
            <span className="sr-only">: {project.name}</span>
            <ArrowRightIcon />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-ink hover:underline hover:underline-offset-4"
          >
            {project.domain}
            <span className="sr-only"> {ui.newTab}</span>
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
