import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ui } from "@/content/site";

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cx("mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-[15px] font-medium transition-colors duration-200";

const buttonVariants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-surface-2",
};

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof buttonVariants;
  /** Abre em nova aba e avisa leitores de tela. */
  external?: boolean;
  /** Link de download direto (ex.: currículo em PDF). */
  download?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  download = false,
  icon,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cx(buttonBase, buttonVariants[variant], className);
  const content = (
    <>
      {children}
      {icon}
      {external && <span className="sr-only"> {ui.newTab}</span>}
    </>
  );

  // Âncoras e arquivos não precisam do roteador do Next (menos JS no cliente).
  if (external || download || href.includes("#")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...(download && { download: true, type: "application/pdf" })}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Eyebrow({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cx(
        "text-caption font-medium tracking-[0.08em] text-muted uppercase",
        className,
      )}
      {...props}
    />
  );
}

type SectionHeadingProps = {
  id: string;
  /** Número da seção na página (1, 2…), exibido antes do rótulo. */
  index?: number;
  eyebrow: string;
  title: string;
  intro?: string;
};

/** Cabeçalho de seção da home. O `id` vai no h2 para o aria-labelledby. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
}: SectionHeadingProps) {
  return (
    <div className="reveal max-w-2xl">
      <Eyebrow className="flex items-center gap-3">
        {index !== undefined && (
          <>
            <span className="text-link">{String(index).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-line-strong/40" aria-hidden="true" />
          </>
        )}
        {eyebrow}
      </Eyebrow>
      <h2
        id={`${id}-titulo`}
        className="mt-3 text-[32px] leading-tight font-bold tracking-[-0.01em] md:text-heading-lg"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 text-subheading">{intro}</p>}
    </div>
  );
}

export function LiveBadge({ label = ui.liveBadge }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-badge bg-surface-2 px-2 py-1 text-caption font-medium tracking-[0.08em] text-ink uppercase">
      <span className="size-2 rounded-full bg-live" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Status com ponto verde pulsando (o pulso some com movimento reduzido). */
export function AvailabilityBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface-1 py-1.5 pr-4 pl-3 text-body-sm font-medium text-ink">
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-live opacity-60 motion-reduce:hidden" />
        <span className="relative size-2.5 rounded-full bg-live" />
      </span>
      {label}
    </span>
  );
}

export function ChipList({
  items,
  label,
  className,
}: {
  items: readonly string[];
  label?: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-chip bg-surface-2 px-3 py-1.5 text-body-sm text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Dados estruturados (schema.org). `<` é escapado para evitar injeção de HTML. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export { cx };
