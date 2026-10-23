import Image from "next/image";

import type { Shot } from "@/content/site";
import { cx } from "@/components/ui";

type MediaFrameProps = {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  /** Mostra uma barra de navegador com este domínio acima do print. */
  domain?: string;
  /** Aproxima o print no hover de um ancestral com a classe `group`. */
  zoom?: boolean;
  className?: string;
};

export function MediaFrame({
  shot,
  sizes,
  priority = false,
  domain,
  zoom = false,
  className,
}: MediaFrameProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-card border border-line bg-surface-2",
        className,
      )}
    >
      {domain && (
        <div
          className="flex h-9 items-center gap-3 border-b border-line bg-surface-1 px-4"
          aria-hidden="true"
        >
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-surface-3" />
            <span className="size-2.5 rounded-full bg-surface-3" />
            <span className="size-2.5 rounded-full bg-surface-3" />
          </span>
          <span className="mx-auto max-w-[60%] truncate rounded-pill bg-surface-2 px-4 py-0.5 text-caption text-muted">
            {domain}
          </span>
          <span className="w-[42px]" />
        </div>
      )}
      <Image
        src={shot.src}
        alt={shot.alt}
        sizes={sizes}
        quality={85}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        placeholder="blur"
        className={cx(
          "h-auto w-full",
          zoom &&
            "origin-top transition-transform duration-500 ease-out group-hover:scale-[1.03]",
        )}
      />
    </div>
  );
}
