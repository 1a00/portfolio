import { CurrentYear } from "@/components/current-year";
import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { contactLinks, footer, nav, person, ui } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-bg pb-10 md:mt-32">
      <Container>
        <div className="grid gap-10 rounded-card bg-surface-1 p-6 md:grid-cols-[1.4fr_1fr_1fr] md:p-10">
          <div>
            <p className="text-heading-sm font-bold text-ink">
              {person.displayName}
            </p>
            <p className="mt-2 text-body-sm">{person.role}</p>
            <p className="text-body-sm">{person.location}</p>
          </div>

          <nav aria-label={ui.footerNav}>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-body-sm text-body transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.icon !== "mail" && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-body-sm text-body transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                  {link.icon !== "mail" && (
                    <span className="sr-only"> {ui.newTab}</span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href={person.resume}
                download
                className="text-body-sm text-body transition-colors duration-200 hover:text-ink"
              >
                {ui.resumeCta}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-1 px-2 text-body-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> {person.fullName}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>{footer.builtWith}</span>
            <a
              href="#conteudo"
              className="inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline"
            >
              {ui.backToTop}
              <ArrowRightIcon width="16" height="16" className="-rotate-90" />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
