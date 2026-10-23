import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { person, seo, ui } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${person.displayName}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: person.displayName,
  authors: [{ name: person.fullName, url: person.linkedin }],
  creator: person.fullName,
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1012" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-pill bg-accent px-5 py-3 text-[15px] font-medium text-white transition-transform duration-200 focus:translate-y-0"
        >
          {ui.skipLink}
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 pt-[62px] outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
