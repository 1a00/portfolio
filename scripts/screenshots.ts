/**
 * Gera os prints dos projetos em public/projetos/<slug>/ (WebP).
 *
 * Uso: npm run screenshots            (todos os projetos)
 *      npm run screenshots -- vitrinei (só um projeto)
 *
 * Roda direto no Node 22.18+ (remoção nativa de tipos), sem compilação.
 */
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";

type Shot = {
  /** Prefixo do arquivo. Vazio = página principal (desktop.webp, mobile.webp...). */
  name: string;
  url: string;
  /**
   * Demos interativas (fita, stories): sem rolagem nem Escape, que avançam
   * a apresentação, e sem página inteira, que é igual à primeira dobra.
   */
  interactive?: boolean;
};

type Target = {
  slug: string;
  shots: Shot[];
};

const TARGETS: Target[] = [
  {
    slug: "dediquei",
    shots: [
      { name: "", url: "https://dediquei.com" },
      {
        name: "nossa-fita-demo",
        url: "https://dediquei.com/nossafita/demo",
        interactive: true,
      },
      {
        name: "nossa-retrospectiva-demo",
        url: "https://dediquei.com/nossa-retrospectiva/demo",
        interactive: true,
      },
    ],
  },
  {
    slug: "vitrinei",
    shots: [{ name: "", url: "https://vitrinei.gg" }],
  },
  {
    // Só a página pública: nada de login ou criação de conta.
    slug: "central-surebet",
    shots: [{ name: "", url: "https://centralsurebet.com" }],
  },
];

const OUTPUT_DIR = path.join(process.cwd(), "public", "projetos");
const SETTLE_MS = 1500;
const WEBP_QUALITY = 86;
// Limite de altura do formato WebP.
const WEBP_MAX_SIDE = 16383;

const DISMISS_TEXTS = [
  "Aceitar todos",
  "Aceitar",
  "Aceito",
  "Concordo",
  "Entendi",
  "Ok, entendi",
  "Permitir todos",
  "Accept all",
  "Accept",
  "Got it",
];

async function dismissOverlays(page: Page) {
  for (const text of DISMISS_TEXTS) {
    const button = page
      .getByRole("button", { name: text, exact: true })
      .first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(400);
    }
  }
  // Escape só com um modal aberto: em demos ele pula a apresentação.
  const modal = page.locator('[role="dialog"][aria-modal="true"]').first();
  if (await modal.isVisible().catch(() => false)) {
    await page.keyboard.press("Escape").catch(() => {});
  }
}

/** Rola até o fim para disparar lazy-load e animações de entrada, depois volta ao topo. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.75);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle").catch(() => {});
}

async function openPage(page: Page, url: string) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(SETTLE_MS);
  await dismissOverlays(page);
}

async function toWebp(png: Buffer, file: string) {
  let image = sharp(png);
  const { width = 0, height = 0 } = await image.metadata();
  if (height > WEBP_MAX_SIDE) {
    image = image.resize({
      width: Math.floor((width * WEBP_MAX_SIDE) / height),
      height: WEBP_MAX_SIDE,
    });
  }
  await image.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(file);
  console.log(`  ✓ ${path.relative(process.cwd(), file)}`);
}

async function capture(browser: Browser, slug: string, shot: Shot) {
  const dir = path.join(OUTPUT_DIR, slug);
  const prefix = shot.name ? `${shot.name}-` : "";
  console.log(`${shot.url}`);

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "pt-BR",
    colorScheme: "dark",
  });
  const desktopPage = await desktop.newPage();
  await openPage(desktopPage, shot.url);
  await toWebp(
    await desktopPage.screenshot({ type: "png" }),
    path.join(dir, `${prefix}desktop.webp`),
  );
  if (!shot.interactive) {
    await scrollThrough(desktopPage);
    await desktopPage.waitForTimeout(SETTLE_MS);
    await dismissOverlays(desktopPage);
    await toWebp(
      await desktopPage.screenshot({ type: "png", fullPage: true }),
      path.join(dir, `${prefix}desktop-full.webp`),
    );
  }
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "pt-BR",
    colorScheme: "dark",
  });
  const mobilePage = await mobile.newPage();
  await openPage(mobilePage, shot.url);
  await toWebp(
    await mobilePage.screenshot({ type: "png" }),
    path.join(dir, `${prefix}mobile.webp`),
  );
  await mobile.close();
}

async function main() {
  const only = process.argv[2];
  const targets = only ? TARGETS.filter((t) => t.slug === only) : TARGETS;
  if (targets.length === 0) {
    throw new Error(`Projeto desconhecido: ${only}`);
  }

  const browser = await chromium.launch();
  let failures = 0;
  try {
    for (const target of targets) {
      const dir = path.join(OUTPUT_DIR, target.slug);
      await rm(dir, { recursive: true, force: true });
      await mkdir(dir, { recursive: true });
      for (const shot of target.shots) {
        try {
          await capture(browser, target.slug, shot);
        } catch (error) {
          failures++;
          console.error(`  ✗ ${shot.url}:`, error);
        }
      }
    }
  } finally {
    await browser.close();
  }
  if (failures > 0) process.exitCode = 1;
}

await main();
