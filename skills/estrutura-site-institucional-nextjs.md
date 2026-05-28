# Skill: Estrutura de Site Institucional — Next.js + Sanity + Vercel

> Use este guia como base para qualquer novo site institucional.
> Troque apenas o **design, as cores, as fontes, os schemas e o conteúdo**.
> A espinha dorsal (estrutura de pastas, configuração, admin, deploy) permanece igual.

---

## 🧱 Stack Base

| Ferramenta | Função |
|---|---|
| **Next.js 16+** | Framework React — rotas, SSR, otimização de imagens |
| **TypeScript** | Tipagem estática em todo o projeto |
| **TailwindCSS v4** | Utilitários CSS (tokens customizados no globals.css) |
| **Sanity v5** | CMS headless — painel admin + banco de conteúdo |
| **next-sanity** | Integração oficial Next.js ↔ Sanity |
| **Vercel** | Hospedagem e deploy automático via GitHub |
| **Lenis + GSAP** | Scroll suave + animações de rolagem |
| **Lucide React** | Biblioteca de ícones SVG |
| **Framer Motion** | Animações de componentes React |

> **Turso e Clerk** são adicionados quando o projeto precisa de banco relacional (Turso/libSQL) ou autenticação de usuários (Clerk). Ver seção específica ao final.

---

## 📁 Estrutura de Pastas

```
meu-projeto/
├── public/
│   ├── images/          # Imagens estáticas (logo, hero, etc.)
│   └── video/           # Vídeos de background
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout: fontes, metadata, SEO global
│   │   ├── page.tsx         # Página principal — monta os componentes em ordem
│   │   ├── globals.css      # Tokens de design (cores, fontes, animações)
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           ├── layout.tsx   # Layout do painel admin (sem indexação Google)
│   │           └── page.tsx     # Renderiza o Sanity Studio embutido
│   ├── components/
│   │   ├── Navbar.tsx       # Header fixo com navegação
│   │   ├── Hero.tsx         # Seção de entrada (vídeo/imagem fullscreen)
│   │   ├── About.tsx        # Seção "Sobre / Conceito"
│   │   ├── Services.tsx     # Cards de serviços (dados do Sanity)
│   │   ├── Gallery.tsx      # Galeria de projetos (dados do Sanity)
│   │   ├── LightControl.tsx # Slider antes/depois (dados do Sanity)
│   │   ├── Testimonials.tsx # Depoimentos (dados do Sanity)
│   │   ├── FinalCTA.tsx     # Bloco final de conversão (CTA)
│   │   ├── Footer.tsx       # Rodapé com contatos e links
│   │   └── SmoothScroll.tsx # Wrapper Lenis + GSAP ScrollTrigger
│   ├── lib/
│   │   └── sanity.ts        # Clientes Sanity (read + write) e urlFor()
│   └── sanity/
│       ├── index.ts         # Exporta todos os schemas juntos
│       └── schemas/
│           ├── service.ts       # Schema: Serviços
│           ├── galleryItem.ts   # Schema: Galeria
│           ├── testimonial.ts   # Schema: Depoimentos
│           └── lightControl.ts  # Schema: Singleton antes/depois
├── sanity.config.ts     # Configuração global do Sanity Studio
├── next.config.ts       # Config Next.js (remote images do Sanity CDN)
├── vercel.json          # Cache de assets estáticos na Vercel
├── .env.local           # Variáveis de ambiente (NÃO commitar)
└── package.json
```

---

## ⚙️ 1. Criar o Projeto

```bash
# Criar projeto Next.js com TypeScript e TailwindCSS
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack

# Instalar dependências do Sanity
npm install sanity next-sanity @sanity/client @sanity/image-url @sanity/vision

# Instalar utilitários de UI e animação
npm install lucide-react framer-motion gsap lenis
```

---

## ⚙️ 2. Variáveis de Ambiente — `.env.local`

```env
# Criado em: https://www.sanity.io/manage → projeto → API → Tokens
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu_token_com_permissao_editor
```

> ⚠️ **NUNCA** commitar o `.env.local` no Git. Sempre adicionar ao `.gitignore`.
> Na Vercel, cadastrar as mesmas variáveis em: **Project → Settings → Environment Variables**

---

## ⚙️ 3. Configuração do Next.js — `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",  // Liberar imagens do CDN do Sanity
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
```

---

## ⚙️ 4. Vercel Cache — `vercel.json`

```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/video/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## ⚙️ 5. Cliente Sanity — `src/lib/sanity.ts`

```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset  = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

// Cliente de leitura (público — usa CDN)
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

// Cliente de escrita (apenas servidor — usa token secreto)
export const writeClient = createClient({
  projectId, dataset, apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper para gerar URLs de imagens do Sanity
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

---

## 🎛️ 6. Painel Administrativo (Sanity Studio Embutido)

### Como funciona
O Sanity Studio roda **dentro do próprio site Next.js**, na rota `/studio`.
O cliente acessa `https://www.seusite.com.br/studio` e gerencia todo o conteúdo.
Não precisa de servidor separado.

### Arquivos necessários

#### `src/app/studio/[[...tool]]/page.tsx`
```typescript
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

#### `src/app/studio/[[...tool]]/layout.tsx`
```typescript
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo",
  robots: { index: false, follow: false }, // esconde do Google
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### Configuração do Studio — `sanity.config.ts`
```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/index";

export default defineConfig({
  name: "meu-projeto-studio",
  title: "Nome do Projeto — Painel Administrativo",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",           // URL do painel dentro do site
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Menu Principal")
          .items([
            // Adicionar um item por schema:
            S.listItem()
              .title("📦 Nome da Seção")
              .child(S.documentTypeList("nomeDoSchema").title("Seção")),

            // Para documento singleton (único registro):
            S.listItem()
              .title("⚙️ Configurações Gerais")
              .child(
                S.document()
                  .schemaType("configuracoes")
                  .documentId("configuracoesSingleton")
                  .title("Configurações")
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
```

---

## 📋 7. Como Criar Schemas Sanity

Os schemas definem os campos que o cliente preenche no painel.

### Schema de Lista (múltiplos registros) — ex: Serviços
```typescript
// src/sanity/schemas/service.ts
import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",           // ID interno — usar em queries GROQ
  title: "Serviços",         // Nome exibido no painel
  type: "document",
  fields: [
    defineField({ name: "order",       title: "Ordem",      type: "number",  validation: (r) => r.required() }),
    defineField({ name: "title",       title: "Título",     type: "string",  validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descrição",  type: "text",    rows: 4 }),
    defineField({ name: "image",       title: "Imagem",     type: "image",   options: { hotspot: true } }),
    // Dropdown de opções:
    defineField({
      name: "category", title: "Categoria", type: "string",
      options: { list: [{ title: "Opção A", value: "a" }, { title: "Opção B", value: "b" }] },
    }),
  ],
  // Ordenar por campo no painel:
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  // Card de preview no painel:
  preview: { select: { title: "title", subtitle: "description", media: "image" } },
});
```

### Schema Singleton (único registro) — ex: Configurações Gerais
```typescript
// src/sanity/schemas/configuracoes.ts
import { defineField, defineType } from "sanity";

export const configuracoesSchema = defineType({
  name: "configuracoes",
  title: "Configurações Gerais",
  type: "document",
  fields: [
    defineField({ name: "telefone",  title: "Telefone/WhatsApp", type: "string" }),
    defineField({ name: "email",     title: "E-mail",            type: "string" }),
    defineField({ name: "endereco",  title: "Endereço",          type: "text" }),
    defineField({ name: "instagram", title: "Instagram",         type: "url" }),
  ],
});
```

### Registrar todos os schemas — `src/sanity/index.ts`
```typescript
import { serviceSchema }      from "./schemas/service";
import { galleryItemSchema }  from "./schemas/galleryItem";
import { testimonialSchema }  from "./schemas/testimonial";
import { configuracoesSchema } from "./schemas/configuracoes";

export const schemaTypes = [
  serviceSchema,
  galleryItemSchema,
  testimonialSchema,
  configuracoesSchema,
];
```

---

## 🔍 8. Buscar Dados Sanity nos Componentes (GROQ)

```typescript
// Exemplo em um componente de servidor (sem "use client")
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

// Buscar lista ordenada
const services = await client.fetch(
  `*[_type == "service"] | order(order asc)`
);

// Buscar singleton
const config = await client.fetch(
  `*[_type == "configuracoes" && _id == "configuracoesSingleton"][0]`
);

// Usar imagem do Sanity:
<img src={urlFor(item.image).width(800).url()} alt={item.title} />

// Ou com next/image:
import Image from "next/image";
<Image
  src={urlFor(item.image).width(800).url()}
  alt={item.title}
  width={800}
  height={600}
/>
```

---

## 🖥️ 9. Root Layout — `src/app/layout.tsx`

Responsável por: fontes globais, metadata SEO, estrutura HTML base.

```typescript
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seusite.com.br"),
  title: "Nome do Site | Slogan",
  description: "Descrição para SEO",
  openGraph: { title: "...", description: "...", url: "...", siteName: "..." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0B",
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

---

## 🎬 10. Scroll Suave — `src/components/SmoothScroll.tsx`

Integra Lenis (scroll suave) + GSAP ScrollTrigger.

```typescript
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Disponibilizar globalmente para links de scroll
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
```

### Usar scroll programático (em links internos):
```typescript
const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const lenis = (window as any).lenis;
  if (lenis) lenis.scrollTo(id, { offset: 0, duration: 1.5 });
};

// No JSX:
<a href="#secao" onClick={(e) => handleScrollTo(e, "#secao")}>Ir para seção</a>
```

---

## 📄 11. Página Principal — `src/app/page.tsx`

Monta as seções na ordem desejada:

```typescript
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import About       from "@/components/About";
import Services    from "@/components/Services";
import Gallery     from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FinalCTA    from "@/components/FinalCTA";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

## 🚀 12. Deploy na Vercel

### Passo a passo
1. Fazer push do projeto para o **GitHub**
2. Acessar **[vercel.com](https://vercel.com)** → Import Project → selecionar o repositório
3. Em **Environment Variables**, cadastrar:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
4. Clicar em **Deploy** — pronto!

### Deploys automáticos
A partir daí, **todo `git push` na branch `main` dispara um novo deploy automático** na Vercel.

### Comandos Git para publicar
```bash
git add -A
git commit -m "feat: descrição da mudança"
git push
```

### Domínio personalizado
Na Vercel: **Project → Settings → Domains** → adicionar `www.seusite.com.br`
Configurar os registros DNS no provedor de domínio (Registro.br, Hostinger, etc.)

---

## 🔗 13. Como criar link para o Painel Admin (no Footer)

```typescript
import Link from "next/link";

// No rodapé, área de copyright:
<Link href="https://www.seusite.com.br/studio" className="hover:text-gold transition-colors">
  Painel Administrativo
</Link>
```

---

## 🔑 14. Adicionar Autenticação com Clerk (quando necessário)

Use o Clerk quando o projeto precisar de **login de usuários** (área de clientes, dashboard, etc.).

### Instalação
```bash
npm install @clerk/nextjs
```

### Variáveis de ambiente (pegar em clerk.com)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Configuração no layout
```typescript
// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Middleware para proteger rotas
```typescript
// middleware.ts (na raiz do projeto)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) auth().protect();
});

export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] };
```

### Componentes de autenticação prontos
```typescript
import { SignIn, SignUp, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

// Botão de login/logout na navbar:
<SignedOut><SignIn /></SignedOut>
<SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
```

---

## 🗄️ 15. Banco de Dados Relacional com Turso (quando necessário)

Use o Turso quando precisar de banco de dados SQL (ex: pedidos, cadastros, histórico).

### Instalação
```bash
npm install @libsql/client drizzle-orm
npm install -D drizzle-kit
```

### Variáveis de ambiente (pegar em turso.tech)
```env
TURSO_DATABASE_URL=libsql://seu-banco.turso.io
TURSO_AUTH_TOKEN=seu_token
```

### Configurar cliente
```typescript
// src/lib/db.ts
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(turso);
```

### Definir tabelas (Drizzle ORM)
```typescript
// src/lib/schema.ts
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const pedidos = sqliteTable("pedidos", {
  id:         integer("id").primaryKey({ autoIncrement: true }),
  nome:       text("nome").notNull(),
  email:      text("email").notNull(),
  mensagem:   text("mensagem"),
  criadoEm:   text("criado_em").default(new Date().toISOString()),
});
```

### Usar nas rotas de API
```typescript
// src/app/api/pedidos/route.ts
import { db } from "@/lib/db";
import { pedidos } from "@/lib/schema";

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(pedidos).values(body);
  return Response.json({ ok: true });
}
```

---

## 📧 16. Envio de E-mails de Contato/Orçamento (Duas Opções)

Para receber contatos ou orçamentos direto no e-mail do cliente, temos duas abordagens estruturadas:

### Opção A: FormSubmit.co (Altamente Recomendado — Sem Servidor/Zero Manutenção)
Esta opção não exige rotas de API no Next.js e nem variáveis de ambiente na Vercel. O FormSubmit cuida do envio SMTP, proteção contra spam (reCAPTCHA invisível) e formatação dos e-mails de forma 100% gratuita.

1. **Como enviar do Front-end (ex: `handleSubmit` no Modal/Form)**:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    // Formata o corpo do e-mail com chaves amigáveis (serão renderizadas como tabela pelo FormSubmit)
    const formSubmitData = {
      Nome: form.nome,
      Telefone: form.telefone,
      "E-mail": form.email || "Não informado",
      Mensagem: form.mensagem,
    };

    const res = await fetch("https://formsubmit.co/ajax/seu_email@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formSubmitData),
    });

    const json = await res.json();
    if (!res.ok || json.success === false || json.success === "false") {
      throw new Error(json.message || "Erro ao processar envio.");
    }
    
    // Sucesso!
    toast.success("Mensagem enviada! Verifique seu e-mail para ativar na primeira vez.");
  } catch (err) {
    toast.error("Erro ao enviar.");
  }
};
```
2. **Ativação**: No **primeiro envio**, o FormSubmit enviará um e-mail para `seu_email@gmail.com` com um botão para ativar o formulário. Após clicá-lo uma única vez, todos os envios subsequentes cairão diretamente na caixa de entrada sem nenhum aviso na tela do usuário.

---

### Opção B: Nodemailer (Rota de API Customizada)
Use o `nodemailer` caso precise de processamento interno no servidor antes do envio ou formatação HTML 100% customizada.

> ⚠️ **Atenção:** Servidores de e-mail (como o Gmail) costumam bloquear requisições SMTP vindas de IPs de nuvens serverless (como a Vercel). Prefira sempre portas explícitas e credenciais robustas de App Password.

1. **Instalação**:
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

2. **Variáveis de ambiente (`.env.local`)**:
Gere uma "Senha de App" na sua Conta Google (Segurança -> Senhas de App).
```env
GMAIL_USER=seu_email@gmail.com
GMAIL_APP_PASSWORD=senha_de_app_16_letras_sem_espacos
```

3. **Rota de API Serverless (`src/app/api/contato/route.ts`)**:
```typescript
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Use host e porta explícitos para maior estabilidade em ambientes Serverless
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true para porta 465
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Meu Site" <${process.env.GMAIL_USER}>`,
      to: "email_recebedor@gmail.com",
      subject: `Novo Contato — ${body.nome}`,
      html: `
        <h2>Novo Contato</h2>
        <p><strong>Nome:</strong> ${body.nome}</p>
        <p><strong>E-mail:</strong> ${body.email}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[MAIL ERROR]", err);
    return NextResponse.json(
      { error: "Erro ao enviar", details: err?.message },
      { status: 500 }
    );
  }
}
```

### Gerenciamento de Modal Global (Context API)
Para abrir um formulário (Modal) a partir de qualquer botão do site (Navbar, Hero, Footer):

1. **Criar Contexto (`src/lib/ModalContext.tsx`)**:
```typescript
"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext({ isOpen: false, open: () => {}, close: () => {} });

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ModalContext.Provider>
  );
}
export const useModal = () => useContext(ModalContext);
```

2. **Envolver a aplicação no Root Layout**:
```typescript
import { ModalProvider } from "@/lib/ModalContext";
import MeuModalWrapper from "@/components/MeuModalWrapper"; // O Wrapper consome o context e renderiza o Modal

export default function RootLayout({ children }) {
  return (
    <ModalProvider>
      <body>
        {children}
        <MeuModalWrapper /> 
      </body>
    </ModalProvider>
  );
}
```

---

## ✅ Checklist para Novo Projeto

- [ ] Criar projeto com `create-next-app`
- [ ] Instalar dependências (sanity, lenis, gsap, lucide-react, framer-motion)
- [ ] Criar projeto no [sanity.io/manage](https://sanity.io/manage) e pegar `projectId` + token
- [ ] Configurar `.env.local` com as variáveis do Sanity
- [ ] Criar `src/lib/sanity.ts` (cliente + urlFor)
- [ ] Criar `sanity.config.ts`
- [ ] Criar pasta `src/app/studio/[[...tool]]/` com `page.tsx` e `layout.tsx`
- [ ] Criar schemas em `src/sanity/schemas/` conforme as seções do site
- [ ] Registrar schemas em `src/sanity/index.ts`
- [ ] Criar componentes das seções em `src/components/`
- [ ] Montar `src/app/page.tsx` com os componentes na ordem
- [ ] Configurar `next.config.ts` para aceitar imagens do `cdn.sanity.io`
- [ ] Adicionar `vercel.json` com cache de assets
- [ ] Fazer push no GitHub e conectar na Vercel
- [ ] Cadastrar variáveis de ambiente na Vercel
- [ ] Configurar domínio personalizado na Vercel
- [ ] Adicionar link "Painel Administrativo" no footer apontando para `/studio`
- [ ] (Opcional) Adicionar Clerk para autenticação
- [ ] (Opcional) Adicionar Turso + Drizzle para banco relacional
