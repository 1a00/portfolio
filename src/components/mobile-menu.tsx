"use client";

import { useEffect, useId, useRef, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";

type MobileMenuProps = {
  items: { label: string; href: string }[];
  label: string;
  openLabel: string;
  closeLabel: string;
};

/** Menu do celular: botão de disclosure com painel abaixo do header. */
export function MobileMenu({ items, label, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    // Fecha se a tela crescer até o layout desktop com o menu aberto.
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onResize() {
      if (desktop.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-input border border-line text-ink transition-colors duration-200 hover:bg-surface-2"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        id={panelId}
        aria-label={label}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pt-2 pb-6 sm:px-6"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-input px-3 text-subheading font-medium text-ink transition-colors duration-200 hover:bg-surface-2"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
