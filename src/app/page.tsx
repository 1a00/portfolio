import type { Metadata } from "next";
import type { CSSProperties } from "react";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  contactIcons,
  skillIcons,
} from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import {
  AvailabilityBadge,
  ButtonLink,
  ChipList,
  Container,
  Eyebrow,
  JsonLd,
  SectionHeading,
} from "@/components/ui";
import {
  contactLinks,
  education,
  hero,
  heroFacts,
  person,
  projects,
  sections,
  seo,
  skills,
  ui,
} from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
  absoluteTitle: true,
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#pessoa"),
  name: person.fullName,
  alternateName: person.displayName,
  jobTitle: person.role,
  url: absoluteUrl("/"),
  email: `mailto:${person.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: person.locality,
    addressRegion: person.region,
    addressCountry: "BR",
  },
  sameAs: [person.linkedin, person.github],
  knowsAbout: skills.flatMap((group) => group.items),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd} />

      <section
        aria-labelledby="inicio-titulo"
        className="relative isolate pt-12 md:pt-24"
      >
        <div
          className="hero-backdrop absolute inset-x-0 top-0 -z-10 h-[640px]"
          aria-hidden="true"
        />
        <Container className="flex flex-col items-center text-center">
          <AvailabilityBadge label={hero.availability} />
          <Eyebrow className="mt-8">{hero.eyebrow}</Eyebrow>
          <h1
            id="inicio-titulo"
            className="mt-5 text-[clamp(2.5rem,6vw+1rem,4.25rem)] leading-none font-bold tracking-[-0.02em]"
          >
            {person.displayName}
          </h1>
          <p className="mt-4 text-heading-sm font-medium text-ink md:text-heading">
            {person.role}
          </p>
          <p className="mt-5 max-w-[560px] text-subheading">{hero.intro}</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/#projetos" icon={<ArrowRightIcon />}>
              {ui.projectsCta}
            </ButtonLink>
            <ButtonLink
              href={person.resume}
              variant="outline"
              download
              icon={<DownloadIcon />}
            >
              {ui.resumeCta}
            </ButtonLink>
          </div>

          <dl className="mt-14 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-card border border-line bg-surface-1/80 backdrop-blur-sm sm:grid-cols-3">
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse justify-end gap-1 border-line px-6 py-5 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
              >
                <dt className="text-body-sm">{fact.label}</dt>
                <dd className="text-heading-sm font-bold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section
        id={sections.projects.id}
        aria-labelledby={`${sections.projects.id}-titulo`}
        className="pt-24 md:pt-32"
      >
        <Container>
          <SectionHeading index={1} {...sections.projects} />
          <div className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id={sections.about.id}
        aria-labelledby={`${sections.about.id}-titulo`}
        className="pt-24 md:pt-32"
      >
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              index={2}
              id={sections.about.id}
              eyebrow={sections.about.eyebrow}
              title={sections.about.title}
            />
            <div className="reveal mt-8 aspect-square w-full max-w-[280px] overflow-hidden rounded-card border border-line bg-surface-1">
              <div
                className="flex size-full items-center justify-center text-[88px] font-bold tracking-[-0.04em] text-ink"
                aria-hidden="true"
              >
                {ui.monogram}
              </div>
            </div>
          </div>
          <div className="reveal-group flex flex-col gap-5 text-subheading lg:pt-14">
            {sections.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section
        id={sections.skills.id}
        aria-labelledby={`${sections.skills.id}-titulo`}
        className="pt-24 md:pt-32"
      >
        <Container>
          <SectionHeading index={3} {...sections.skills} />
          <ul className="reveal-group mt-10 grid gap-4 sm:grid-cols-2">
            {skills.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <li
                  key={group.title}
                  className="rounded-card border border-transparent bg-surface-1 p-6 transition-colors duration-200 hover:border-line"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-chip bg-surface-2 text-link">
                      <Icon />
                    </span>
                    <h3 className="text-[20px] font-bold">{group.title}</h3>
                  </div>
                  <ChipList items={group.items} className="mt-5" />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id={sections.education.id}
        aria-labelledby={`${sections.education.id}-titulo`}
        className="pt-24 md:pt-32"
      >
        <Container>
          <SectionHeading index={4} {...sections.education} />
          <ul className="reveal-group mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {education.map((item) => (
              <li
                key={item.course}
                className="flex flex-col rounded-card bg-surface-1 p-6 md:p-8"
              >
                <div className="flex min-h-20 items-center justify-between gap-4">
                  <span
                    className="logo-mask block min-w-0 text-ink"
                    style={
                      {
                        width: item.logo.width,
                        aspectRatio: `${item.logo.width} / ${item.logo.height}`,
                        "--logo": `url(${item.logo.src})`,
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <span className="shrink-0 self-start rounded-badge bg-accent px-2 py-1 whitespace-nowrap text-caption font-medium tracking-[0.08em] text-white uppercase">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-6 border-t border-line pt-6 text-heading-sm font-bold">
                  {item.course}
                </h3>
                <p className="mt-2">{item.institution}</p>
                <p className="mt-1 text-body-sm text-muted">{item.period}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id={sections.contact.id}
        aria-labelledby={`${sections.contact.id}-titulo`}
        className="pt-24 md:pt-32"
      >
        <Container>
          <div className="reveal relative isolate grid gap-10 overflow-hidden rounded-card bg-surface-1 p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
            <div
              className="hero-backdrop absolute inset-0 -z-10 opacity-70"
              aria-hidden="true"
            />
            <div>
              <AvailabilityBadge label={hero.availability} />
              <div className="mt-8">
                <SectionHeading index={5} {...sections.contact} />
              </div>
              <ButtonLink
                href={person.resume}
                download
                icon={<DownloadIcon />}
                className="mt-8"
              >
                {ui.resumeCta}
              </ButtonLink>
            </div>
            <ul className="flex flex-col gap-3 self-center">
              {contactLinks.map((link) => {
                const Icon = contactIcons[link.icon];
                const external = link.icon !== "mail";
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="group flex items-center gap-4 rounded-chip bg-surface-2 p-4 transition-colors duration-200 hover:bg-surface-3 md:p-5"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-chip bg-surface-1 text-ink">
                        <Icon />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-body-sm text-muted">{link.label}</span>
                        <span className="truncate font-medium text-ink">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRightIcon className="ml-auto shrink-0 text-muted transition-colors group-hover:text-ink" />
                      {external && <span className="sr-only"> {ui.newTab}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
