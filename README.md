# Portfolio Pessoal

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
</p>

Site institucional e portfólio profissional desenvolvido com foco em performance, internacionalização e experiência do usuário. Apresenta projetos, stack tecnológica, informações de contato e integração com Notion para gestão de mensagens.

---

## Objetivo do Projeto

Este repositório concentra a **versão 3** do portfólio pessoal, com os seguintes objetivos:

- **Apresentação profissional** — Página inicial, sobre mim, projetos e stack de forma clara e visual.
- **Internacionalização (i18n)** — Suporte a **Português**, **Inglês** e **Espanhol** para ampliar o alcance.
- **Contato integrado** — Formulário de contato que persiste mensagens em um banco **Notion**, facilitando a gestão.
- **SEO e acessibilidade** — Metadados, sitemap, `robots.txt` e estrutura semântica para bons resultados em buscas e leitores de tela.
- **Tema claro/escuro** — Alternância de tema com persistência de preferência do usuário.
- **Responsividade** — Layout adaptado para mobile, tablet e desktop.

---

## Tecnologias

### Core

| Tecnologia         | Uso                                                   |
| ------------------ | ----------------------------------------------------- |
| **Next.js 16**     | Framework React com App Router, SSR e rotas dinâmicas |
| **React 19**       | Interface e componentes                               |
| **TypeScript**     | Tipagem estática e melhor DX                          |
| **Tailwind CSS 4** | Estilização utilitária e tema (claro/escuro)          |

### UX e UI

| Tecnologia                  | Uso                                         |
| --------------------------- | ------------------------------------------- |
| **Framer Motion**           | Animações e transições                      |
| **next-themes**             | Tema claro/escuro com persistência          |
| **react-hot-toast**         | Notificações (feedback de formulário, etc.) |
| **react-medium-image-zoom** | Zoom em imagens (galeria, projetos)         |
| **react-icons**             | Ícones (Lucide, Simple Icons, etc.)         |
| **country-flag-icons**      | Bandeiras para seletor de idioma            |

### Formulários e dados

| Tecnologia           | Uso                                            |
| -------------------- | ---------------------------------------------- |
| **react-hook-form**  | Formulário de contato com validação            |
| **@notionhq/client** | API do Notion para salvar mensagens de contato |
| **DOMPurify**        | Sanitização de conteúdo HTML (XSS)             |

### Utilitários e tooling

| Tecnologia                            | Uso                                              |
| ------------------------------------- | ------------------------------------------------ |
| **clsx** + **tailwind-merge**         | Classes condicionais e merge de estilos Tailwind |
| **dateformat**                        | Formatação de datas (ex.: mensagens no Notion)   |
| **next-sitemap**                      | Geração de `sitemap.xml` no build                |
| **Vercel Analytics / Speed Insights** | Métricas de uso e performance (opcional)         |

### Desenvolvimento

| Tecnologia    | Uso                                                              |
| ------------- | ---------------------------------------------------------------- |
| **ESLint**    | Linting e padrões de código                                      |
| **Turbopack** | Servidor de desenvolvimento mais rápido (`next dev --turbopack`) |

---

## Estrutura do Projeto

- **`src/app`** — Rotas (App Router), layouts, estilos globais, API e dados.
- **`src/components`** — Componentes reutilizáveis (Navbar, Footer, Cards, etc.).
- **`src/constants`** — Dados estáticos (stack, about, SEO, socials).
- **`src/context`** — Contexto de internacionalização.
- **`src/locales`** — Traduções (pt, en, es) por página.
- **`src/providers`** — Providers (tema, i18n).
- **`src/libs`** — Funções utilitárias (cn, animate, browser).
- **`public`** — Imagens, fontes, PDFs e arquivos estáticos.

---

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm**, **yarn** ou **pnpm**
- Conta no **Notion** (opcional, apenas para o formulário de contato)

### Variáveis de ambiente (formulário de contato)

Para o envio de mensagens para o Notion, crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_NOTION_API_KEY=sua_chave_integration
NEXT_PUBLIC_NOTION_DATABASE_KEY=id_do_banco_de_dados
```

- **Notion API Key**: em [Notion Integrations](https://www.notion.so/my-integrations), crie uma integração e use o "Internal Integration Secret".
- **Database ID**: no banco onde as mensagens serão salvas, use "Copy link" e pegue o ID na URL.

Sem essas variáveis, o restante do site funciona; apenas o envio do formulário de contato ficará indisponível.

---

## Como rodar

### Instalação

```bash
git clone https://github.com/ffzanini/portfolio-personal.git
cd portfolio-personal
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O projeto usa Turbopack por padrão.

### Build e produção

```bash
npm run build
npm run start
```

O `postbuild` gera automaticamente o `sitemap.xml` (e `sitemap-0.xml` quando aplicável).

### Lint

```bash
npm run lint
```

---

## Scripts disponíveis

| Script          | Descrição                                      |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Sobe o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera o build de produção                       |
| `npm run start` | Inicia o servidor em modo produção             |
| `npm run lint`  | Executa o ESLint                               |

---

## Licença

Este projeto está sob a licença [MIT](./LICENSE).

---

## Contato

Dúvidas sobre o projeto, consultoria ou interesse em produtos digitais e desenvolvimento utilize o formulário de contato disponível no site ou os canais indicados no próprio portfólio.

- **Site:** [ffzanini.dev](https://www.ffzanini.dev)

---

<p align="center">
  Feito com 💙 por Felipe Frantz Zanini
</p>
