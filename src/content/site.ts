/**
 * Todo o texto do site fica aqui. Edite este arquivo para mudar conteúdo
 * sem mexer nos componentes.
 *
 * Os prints dos projetos são gerados por `npm run screenshots` em
 * public/projetos/<slug>/ e importados abaixo (o Next lê as dimensões).
 */
import type { StaticImageData } from "next/image";

import dediqueiDesktop from "../../public/projetos/dediquei/desktop.webp";
import dediqueiFull from "../../public/projetos/dediquei/desktop-full.webp";
import dediqueiMobile from "../../public/projetos/dediquei/mobile.webp";
import dediqueiFitaDesktop from "../../public/projetos/dediquei/nossa-fita-demo-desktop.webp";
import dediqueiFitaMobile from "../../public/projetos/dediquei/nossa-fita-demo-mobile.webp";
import dediqueiRetroDesktop from "../../public/projetos/dediquei/nossa-retrospectiva-demo-desktop.webp";
import dediqueiRetroMobile from "../../public/projetos/dediquei/nossa-retrospectiva-demo-mobile.webp";
import vitrineiDesktop from "../../public/projetos/vitrinei/desktop.webp";
import vitrineiFull from "../../public/projetos/vitrinei/desktop-full.webp";
import vitrineiMobile from "../../public/projetos/vitrinei/mobile.webp";
import surebetDesktop from "../../public/projetos/central-surebet/desktop.webp";
import surebetFull from "../../public/projetos/central-surebet/desktop-full.webp";
import surebetMobile from "../../public/projetos/central-surebet/mobile.webp";

export type Shot = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  url: string;
  /** Domínio sem protocolo, para exibir. */
  domain: string;
  /** Uma frase para o card da home e a meta description. */
  summary: string;
  problem: string[];
  solution: string[];
  built: string[];
  stack: string[];
  cover: Shot;
  /** Página inteira em desktop, exibida numa moldura com rolagem. */
  fullPage: Shot;
  mobile: Shot;
  /** Outras telas que valem mostrar (desktop e mobile). */
  gallery: Shot[];
};

export const person = {
  fullName: "Iago Silva",
  displayName: "Iago Silva",
  role: "Desenvolvedor Front-end em formação",
  location: "Campina Grande – PB",
  locality: "Campina Grande",
  region: "PB",
  email: "iago.devmail@gmail.com",
  linkedin: "https://www.linkedin.com/in/iagoyr/",
  github: "https://github.com/1a00",
  /** Coloque o arquivo em public/curriculo-iago-silva.pdf. */
  resume: "/curriculo-iago-silva.pdf",
};

export const seo = {
  title: `${person.displayName} — ${person.role}`,
  description:
    "Portfólio de Iago Silva, estudante de ADS (UEPB) e Sistemas de Informação (Unifacisa). Interfaces responsivas em Next.js com foco em experiência do usuário e SEO técnico.",
  keywords: [
    "Iago Silva",
    "desenvolvedor front-end",
    "estágio front-end",
    "Next.js",
    "React",
    "SEO técnico",
    "Campina Grande",
  ],
};

export const nav = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Competências", href: "/#competencias" },
  { label: "Formação", href: "/#formacao" },
  { label: "Contato", href: "/#contato" },
];

export const ui = {
  skipLink: "Pular para o conteúdo",
  menuOpen: "Abrir menu",
  menuClose: "Fechar menu",
  mainNav: "Navegação principal",
  themeToggle: "Alternar entre tema claro e escuro",
  headerCta: "Fale comigo",
  resumeCta: "Baixar currículo",
  projectsCta: "Ver projetos",
  caseStudyCta: "Ver estudo de caso",
  visitCta: "Visitar site",
  liveBadge: "No ar",
  newTab: "(abre em nova aba)",
  backToProjects: "Todos os projetos",
  home: "Início",
  projects: "Projetos",
  footerNav: "Rodapé",
  breadcrumb: "Trilha de navegação",
  stack: "Tecnologias",
  monogram: "IS",
  backToTop: "Voltar ao topo",
};

export const hero = {
  availability: "Disponível para estágio",
  eyebrow: `${person.location} · Front-end e SEO`,
  intro:
    "Construo interfaces responsivas em Next.js com boa experiência de uso e SEO técnico bem feito. Três projetos próprios já estão no ar.",
};

export const sections = {
  projects: {
    id: "projetos",
    eyebrow: "Projetos",
    title: "Sites que construí e publiquei",
    intro:
      "Cada projeto tem um estudo de caso com o problema, a solução, o que eu construí e prints das telas.",
  },
  about: {
    id: "sobre",
    eyebrow: "Sobre",
    title: "Front-end e SEO no mesmo projeto",
    paragraphs: [
      "Sou estudante de Análise e Desenvolvimento de Sistemas na UEPB e de Sistemas de Informação na Unifacisa, e tenho projetos web próprios publicados.",
      "Construo interfaces responsivas em Next.js com foco em experiência do usuário e SEO técnico on-page.",
    ],
  },
  skills: {
    id: "competencias",
    eyebrow: "Competências",
    title: "O que uso no dia a dia",
  },
  education: {
    id: "formacao",
    eyebrow: "Formação",
    title: "Duas graduações em andamento",
  },
  contact: {
    id: "contato",
    eyebrow: "Contato",
    title: "Vamos conversar",
    intro:
      "Estou buscando estágio em Front-end ou SEO. Escreva para o meu e-mail ou me encontre no LinkedIn e no GitHub.",
  },
};

export const skills = [
  {
    title: "Front-end",
    icon: "code",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Layouts responsivos",
    ],
  },
  {
    title: "SEO",
    icon: "search",
    items: [
      "SEO técnico on-page",
      "Metadados, Open Graph e Twitter Cards",
      "Dados estruturados (JSON-LD)",
      "Sitemap e robots.txt",
    ],
  },
  {
    title: "Back-end e dados",
    icon: "database",
    items: [
      "Supabase",
      "SQL e modelagem relacional",
      "Java (orientação a objetos)",
    ],
  },
  {
    title: "Ferramentas",
    icon: "tools",
    items: ["Git e GitHub", "Vercel (deploy e domínios)", "npm"],
  },
] as const;

/**
 * Os logos ficam em public/formacao/ em SVG de uma cor só; o site pinta com a
 * cor do texto do tema. `width` e `height` são o tamanho exibido, em px.
 */
export const education = [
  {
    course: "Bacharelado em Sistemas de Informação",
    institution: "Unifacisa Centro Universitário",
    period: "Início em 2025",
    status: "Em andamento",
    logo: { src: "/formacao/unifacisa.svg", width: 221, height: 50 },
  },
  {
    course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    institution: "Universidade Estadual da Paraíba (UEPB)",
    period: "Início em 2025",
    status: "Em andamento",
    logo: { src: "/formacao/uepb.svg", width: 50, height: 80 },
  },
];

export const contactLinks = [
  {
    label: "E-mail",
    value: person.email,
    href: `mailto:${person.email}`,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/iagoyr",
    href: person.linkedin,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/1a00",
    href: person.github,
    icon: "github",
  },
] as const;

export const caseStudy = {
  eyebrow: "Estudo de caso",
  problem: "O problema",
  solution: "A solução",
  built: "O que eu construí",
  stack: "Tecnologias",
  site: "Site",
  status: "Status",
  screens: "Telas",
  fullPage: "Página inicial completa",
  fullPageHint: "Role dentro da moldura para ver a página inteira.",
  mobile: "No celular",
  next: "Próximo projeto",
};

export const notFound = {
  eyebrow: "Erro 404",
  title: "Esta página saiu do mapa",
  text: "O endereço pode ter mudado ou nunca ter existido. Os projetos continuam no mesmo lugar.",
  cta: "Voltar para o início",
};

export const footer = {
  builtWith: "Feito com Next.js e publicado na Vercel.",
};

export const projects: Project[] = [
  {
    slug: "dediquei",
    name: "Dediquei",
    url: "https://dediquei.com",
    domain: "dediquei.com",
    summary:
      "Plataforma de presentes digitais para casais: momentos, fotos e datas do relacionamento viram um presente para o par abrir e guardar.",
    problem: [
      "Casais guardam a própria história espalhada: fotos no celular, datas na memória, mensagens soltas em conversas.",
      "Faltava um jeito simples de reunir esses momentos e transformá-los em algo que desse para entregar como presente, abrir e guardar.",
    ],
    solution: [
      "O Dediquei reúne momentos, fotos e datas do relacionamento e transforma tudo num presente digital, com dois produtos.",
      "Nossa Fita é um presente em formato de fita cassete, com faixas que têm foto, data e texto. Nossa Retrospectiva conta a história do casal em formato de stories, com números, jogos e cartazes para salvar.",
    ],
    built: [
      "Página institucional que apresenta a marca e os dois produtos.",
      "Fluxos de montagem da Nossa Fita e da Nossa Retrospectiva.",
      "Páginas de demonstração de cada produto, para o visitante ver o presente antes de montar o seu.",
      "SEO técnico on-page: title, meta description, URL canônica, Open Graph, Twitter Cards e link de “pular para o conteúdo”.",
    ],
    stack: ["Next.js", "Supabase", "Vercel"],
    cover: {
      src: dediqueiDesktop,
      alt: "Página inicial do Dediquei no desktop, com o título “Presentes digitais com a história de vocês dois” e os botões “Montar uma fita” e “Montar retrospectiva”.",
    },
    fullPage: {
      src: dediqueiFull,
      alt: "Página inicial completa do Dediquei: hero, seção da Nossa Fita com a ilustração da fita cassete e as faixas, seção da Nossa Retrospectiva com um celular mostrando os stories, e rodapé.",
    },
    mobile: {
      src: dediqueiMobile,
      alt: "Página inicial do Dediquei no celular.",
    },
    gallery: [
      {
        src: dediqueiFitaDesktop,
        alt: "Demonstração da Nossa Fita no desktop: primeira faixa com foto do casal, os nomes Lia e Téo e a data de início do relacionamento.",
        caption: "Demonstração da Nossa Fita",
      },
      {
        src: dediqueiRetroDesktop,
        alt: "Demonstração da Nossa Retrospectiva no desktop: cartão verde com a música do casal e cartão com a foto do casal.",
        caption: "Demonstração da Nossa Retrospectiva",
      },
      {
        src: dediqueiFitaMobile,
        alt: "Demonstração da Nossa Fita no celular.",
        caption: "Nossa Fita no celular",
      },
      {
        src: dediqueiRetroMobile,
        alt: "Demonstração da Nossa Retrospectiva no celular.",
        caption: "Nossa Retrospectiva no celular",
      },
    ],
  },
  {
    slug: "vitrinei",
    name: "Vitrinei",
    url: "https://vitrinei.gg",
    domain: "vitrinei.gg",
    summary:
      "Catálogo que liga produtos mostrados em vídeos ao link certo na Shopee: o visitante digita o ID que aparece no vídeo e encontra o produto.",
    problem: [
      "Quem assiste a um vídeo e gosta de um produto precisa achar exatamente aquele item na Shopee, entre muitos anúncios parecidos.",
    ],
    solution: [
      "Cada produto mostrado nos vídeos ganha um ID. O visitante digita esse ID no Vitrinei e cai no produto certo, com o link de redirecionamento para a Shopee.",
      "Para quem chega sem um ID, o catálogo também dá para navegar pelos mais procurados, por categorias e por coleções.",
    ],
    built: [
      "Busca por ID do produto.",
      "Vitrine dos mais procurados.",
      "Navegação por categorias e coleções.",
      "Cards de produto com imagem, categoria e descrição.",
      "Links de redirecionamento para a Shopee.",
      "Metadados para buscadores e redes sociais.",
    ],
    stack: ["Next.js", "Supabase (armazenamento de imagens)"],
    cover: {
      src: vitrineiDesktop,
      alt: "Página inicial do Vitrinei no desktop, com o título “Encontrou um produto nos nossos vídeos?”, o campo de busca por ID e a vitrine de mais procurados.",
    },
    fullPage: {
      src: vitrineiFull,
      alt: "Página inicial completa do Vitrinei, com a busca por ID, a vitrine de mais procurados e o catálogo de produtos por categoria.",
    },
    mobile: {
      src: vitrineiMobile,
      alt: "Página inicial do Vitrinei no celular, com a busca por ID e os primeiros cards de produto.",
    },
    gallery: [],
  },
  {
    slug: "central-surebet",
    name: "Central Surebet",
    url: "https://centralsurebet.com",
    domain: "centralsurebet.com",
    summary:
      "Plataforma web que reúne as ferramentas de quem opera surebet (arbitragem esportiva) num só lugar, no lugar de planilhas soltas.",
    problem: [
      "Quem opera surebet costuma controlar cálculos, apostas e banca em planilhas soltas, cada uma num lugar.",
    ],
    solution: [
      "A Central Surebet centraliza essas ferramentas numa plataforma web: calculadora, planilha de apostas, dashboard e controle da banca.",
      "Para quem ainda não conhece o conceito, a landing page explica a arbitragem esportiva com um exemplo numérico.",
    ],
    built: [
      "Landing page que explica o conceito com um exemplo numérico e compara os planos.",
      "Calculadora de dutching nos modos simples, avançado e aumentado, com ROI, lucro e retorno.",
      "Área do usuário com planilha e dashboard de apostas.",
      "Gestão de casas de apostas.",
      "Controle de entradas e saídas da banca.",
    ],
    stack: ["Next.js"],
    cover: {
      src: surebetDesktop,
      alt: "Página inicial da Central Surebet no desktop, com o título “Lucro garantido, não importa quem ganhe.” e um exemplo da calculadora de dutching com ROI, lucro e retorno.",
    },
    fullPage: {
      src: surebetFull,
      alt: "Página inicial completa da Central Surebet, com a explicação do que é surebet, o exemplo com números e a comparação de planos.",
    },
    mobile: {
      src: surebetMobile,
      alt: "Página inicial da Central Surebet no celular.",
    },
    gallery: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** Fatos do hero, contados a partir dos dados acima. */
export const heroFacts = [
  { value: String(projects.length), label: "projetos próprios no ar" },
  { value: String(education.length), label: "graduações em andamento" },
  { value: "Next.js", label: "stack principal, com Supabase e Vercel" },
];
