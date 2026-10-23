import Link from "next/link";

import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme";
import { ButtonLink, Container } from "@/components/ui";
import { nav, person, ui } from "@/content/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <Container className="relative flex h-[62px] items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[17px] font-bold tracking-[-0.01em] whitespace-nowrap text-ink"
        >
          {person.displayName}
        </Link>

        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-pill px-4 py-2 text-[15px] text-ink transition-colors duration-200 hover:bg-surface-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle label={ui.themeToggle} />
          <div className="hidden sm:block">
            <ButtonLink href="/#contato" className="min-h-10 px-5 py-2">
              {ui.headerCta}
            </ButtonLink>
          </div>
          <MobileMenu
            items={nav}
            label={ui.mainNav}
            openLabel={ui.menuOpen}
            closeLabel={ui.menuClose}
          />
        </div>
      </Container>
      <div
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-accent"
        aria-hidden="true"
      />
    </header>
  );
}
