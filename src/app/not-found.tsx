import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { notFound } from "@/content/site";

export const metadata: Metadata = {
  title: notFound.title,
  description: notFound.text,
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center md:py-40">
      <Eyebrow>{notFound.eyebrow}</Eyebrow>
      <h1 className="mt-5 text-[clamp(2.5rem,5vw+1rem,4.25rem)] leading-none font-bold tracking-[-0.02em]">
        {notFound.title}
      </h1>
      <p className="mt-6 max-w-[520px] text-subheading">{notFound.text}</p>
      <ButtonLink href="/" icon={<ArrowRightIcon />} className="mt-10">
        {notFound.cta}
      </ButtonLink>
    </Container>
  );
}
