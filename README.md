<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
</p>

<h1 align="center">Portfolio Pessoal · ffzanini.dev</h1>

<p align="center">
  Site institucional e portfólio profissional com i18n, tema claro/escuro e formulário de contato integrado ao Notion.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-estrutura-do-projeto">Estrutura</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-contato">Contato</a>&nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

---

## 📋 Sobre o projeto

Este repositório concentra a **versão 3** do portfólio pessoal ([ffzanini.dev](https://www.ffzanini.dev)), desenvolvido com foco em **performance**, **internacionalização** e **experiência do usuário**. O site apresenta página inicial, sobre mim, projetos e stack tecnológica de forma clara e visual, além de formulário de contato que persiste as mensagens em um banco **Notion** para gestão centralizada.

O projeto foi desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS**, priorizando boa experiência em dispositivos móveis e desktop, SEO e acessibilidade.

---

## ✨ Funcionalidades

- **Idiomas:** Português, Inglês e Espanhol (i18n)
- **Tema:** Alternância entre modo claro e escuro com persistência da preferência
- **Contato:** Formulário integrado ao Notion para recebimento e gestão de mensagens
- **SEO:** Sitemap, metadados e estrutura semântica para indexação e leitores de tela
- **Analytics:** Integração com Vercel Analytics e Speed Insights (opcional)
- **Layout responsivo:** Adaptado para mobile, tablet e desktop

---

## 🛠 Tecnologias

### Principais

| Tecnologia | Uso |
|------------|-----|
| [Next.js](https://nextjs.org/) | Framework React, App Router, SSR, rotas dinâmicas |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização e tema claro/escuro |
| [React](https://react.dev/) | Interface e componentes |
| [Vercel](https://vercel.com/) | Hospedagem e deploy |

### Complementares

| Tecnologia | Uso |
|------------|-----|
| [Framer Motion](https://motion.dev/) | Animações e transições |
| [next-themes](https://github.com/pacocoursey/next-themes) | Tema claro/escuro |
| [react-hook-form](https://react-hook-form.com/) | Formulário de contato com validação |
| [@notionhq/client](https://github.com/makenotion/notion-sdk-js) | Persistência de mensagens no Notion |
| [react-hot-toast](https://react-hot-toast.com/) | Notificações (toast) |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones |
| [react-medium-image-zoom](https://github.com/rpearce/react-medium-image-zoom) | Zoom em imagens |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Sanitização de HTML (XSS) |
| [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) | Geração de sitemap |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Classes condicionais e merge de estilos |
| [Turbopack](https://turbo.build/pack) | Servidor de desenvolvimento (Next.js) |

---

## 📁 Estrutura do Projeto

- **`src/app`** — Rotas (App Router), layouts, estilos globais, API e dados.
- **`src/components`** — Componentes reutilizáveis (Navbar, Footer, Cards, etc.).
- **`src/constants`** — Dados estáticos (stack, about, SEO, socials).
- **`src/context`** — Contexto de internacionalização.
- **`src/locales`** — Traduções (pt, en, es) por página.
- **`src/providers`** — Providers (tema, i18n).
- **`src/libs`** — Funções utilitárias (cn, animate, browser).
- **`public`** — Imagens, fontes, PDFs e arquivos estáticos.

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ (recomendado: LTS)
- npm, yarn ou pnpm
- Conta no [Notion](https://www.notion.so/) (opcional; apenas para o formulário de contato)

### Variáveis de ambiente (formulário de contato)

Para o envio de mensagens para o Notion, crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_NOTION_API_KEY=sua_chave_integration
NEXT_PUBLIC_NOTION_DATABASE_KEY=id_do_banco_de_dados
```

- **Notion API Key:** em [Notion Integrations](https://www.notion.so/my-integrations), crie uma integração e use o "Internal Integration Secret".
- **Database ID:** no banco onde as mensagens serão salvas, use "Copy link" e pegue o ID na URL.

Sem essas variáveis, o restante do site funciona; apenas o envio do formulário de contato ficará indisponível.

### Passos

**1. Clonar o repositório**

```bash
git clone https://github.com/ffzanini/portfolio-personal.git
cd portfolio-personal
```

**2. Instalar dependências**

```bash
npm install
```

**3. Rodar em desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O projeto usa Turbopack por padrão.

**4. Build para produção**

```bash
npm run build
npm start
```

O `postbuild` gera automaticamente o `sitemap.xml` (e `sitemap-0.xml` quando aplicável).

**5. Lint**

```bash
npm run lint
```

### Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Sobe o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção |
| `npm run lint` | Executa o ESLint |

---

## 👋 Contato

Dúvidas sobre o projeto, consultoria ou interesse em produtos digitais e desenvolvimento? Entre em contato:

- **Site:** [ffzanini.dev](https://www.ffzanini.dev)
- **LinkedIn:** [linkedin.com/in/ffzanini](https://www.linkedin.com/in/ffzanini/)

Ou utilize o formulário de contato disponível no próprio portfólio.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<p align="center">
  Feito com 💙 por Felipe Frantz Zanini
</p>
