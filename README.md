# Portfólio — Iago Silva

Portfólio pessoal de **Iago Silva**, focado nos projetos publicados (Dediquei, Vitrinei e Central Surebet). O site também serve como prova técnica: responsivo, acessível, rápido e com SEO técnico completo.

- **Stack:** Next.js 16 (App Router, Cache Components), TypeScript e Tailwind CSS v4
- **Design:** `docs/design/DESIGN.md` (tema escuro e claro, DM Sans, azul como único destaque)
- **Deploy:** Vercel

## Como rodar

Requer Node.js 22.18 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando               | O que faz                                                          |
| --------------------- | ------------------------------------------------------------------ |
| `npm run dev`         | Servidor de desenvolvimento                                        |
| `npm run build`       | Build de produção (tudo é pré-renderizado de forma estática)        |
| `npm run start`       | Serve o build de produção                                          |
| `npm run lint`        | ESLint                                                             |
| `npm run screenshots` | Recaptura os prints dos projetos (veja abaixo)                     |

## Como editar o conteúdo

Todo o texto está em **`src/content/site.ts`**: dados pessoais, hero, seções, competências, formação, contato e os projetos. Os componentes não têm texto fixo.

- **Novo projeto:** adicione um objeto em `projects` (o `slug` vira a URL `/projetos/<slug>`), inclua o site em `TARGETS` no `scripts/screenshots.ts` e rode `npm run screenshots -- <slug>`. Depois importe os prints no topo do `site.ts`, como os outros.
- **Ordem dos projetos:** é a ordem do array `projects`.
- **Currículo:** salve o PDF em `public/curriculo-iago-silva.pdf`. Os botões "Baixar currículo" já apontam para ele.

### Prints dos projetos

`npm run screenshots` abre cada site com Playwright e salva em `public/projetos/<slug>/`, em WebP:

- `desktop.webp`: 1440×900, primeira dobra
- `desktop-full.webp`: página inteira em 1440px
- `mobile.webp`: 390×844, densidade 2x
- páginas internas com prefixo (ex.: `nossa-fita-demo-desktop.webp`)

O script espera `networkidle` e mais 1,5s e fecha banners de cookies. Páginas marcadas como `interactive` (as demos do Dediquei) não são roladas nem recebem Escape, porque isso avança a apresentação. Para capturar só um projeto: `npm run screenshots -- vitrinei`. Rodar o script apaga e recria a pasta do projeto.

Na primeira vez, instale o navegador: `npx playwright install chromium`.

## SEO e acessibilidade

- Metadata API com title e description únicos por página, URL canônica, Open Graph e Twitter Cards
- Imagens OG geradas por código (`opengraph-image.tsx`), uma geral e uma por projeto
- `sitemap.xml`, `robots.txt` (bloqueia indexação em previews da Vercel) e JSON-LD (`Person` na home; `CreativeWork` e `BreadcrumbList` nos projetos)
- `lang="pt-BR"`, um `h1` por página, link "pular para o conteúdo", foco visível, contraste AA nos dois temas, menu mobile acessível por teclado

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório. O framework (Next.js) é detectado sozinho.
3. Em **Settings → Environment Variables**, crie `NEXT_PUBLIC_SITE_URL` com o domínio final, sem barra no fim (ex.: `https://iagosilva.com.br`). Sem ela, o site usa o domínio `*.vercel.app` de produção.
4. Em **Settings → Domains**, conecte o domínio e faça um novo deploy para os metadados usarem a URL certa.
5. Depois do deploy, rode o [PageSpeed Insights](https://pagespeed.web.dev/) na URL pública e envie o sitemap (`/sitemap.xml`) no Google Search Console.

Veja `.env.example` para as variáveis.
