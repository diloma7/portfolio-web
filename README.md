# DILOMA OUATTARA — Portfolio

A performant, accessible personal portfolio built with **Next.js 15**, **TypeScript**, **GSAP**, and **Three.js**. Features immersive 3D animations, a contact form backed by Nodemailer, an AI chat demo, and a project showcase with case studies.

**Live:** https://diloma.dev

---

## Tech Stack

| Layer            | Technology                    | Reason                                                  |
| ---------------- | ----------------------------- | ------------------------------------------------------- |
| Framework        | Next.js 15 (App Router)       | SSR, file-based routing, built-in metadata/sitemap APIs |
| Language         | TypeScript                    | Type safety across components, API routes, and schemas  |
| Styling          | Tailwind CSS v4               | Utility-first, zero runtime CSS                         |
| UI Components    | shadcn/ui (Radix UI)          | Accessible, unstyled primitives                         |
| 3D Graphics      | Three.js + React Three Fiber  | Interactive blob and particle background                |
| Animations       | GSAP + ScrollTrigger          | Scroll-driven entrance animations                       |
| Background FX    | CSS keyframes (no JS)         | Zero main-thread cost for ambient blob animations       |
| Forms            | React Hook Form + Zod         | Type-safe validation with shadcn form integration       |
| Email            | Nodemailer + Gmail SMTP       | Contact form delivers to personal inbox                 |
| AI               | Vercel AI SDK (Google/OpenAI) | Chat demo component                                     |
| Testing          | Vitest + Testing Library      | Unit and integration tests                              |
| Containerization | Docker + Docker Compose       | Consistent deployment environment                       |
| Build            | Turbopack                     | Faster dev and build times                              |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — metadata, BackgroundFX, Header
│   ├── page.tsx                # Home page — SplashGate + ThreeParticles + content
│   ├── sitemap.ts              # Auto-generates /sitemap.xml
│   ├── robots.ts               # Auto-generates /robots.txt
│   ├── about/page.tsx          # Main landing content (hero, experience, projects preview)
│   ├── projects/
│   │   ├── layout.tsx          # Projects page metadata
│   │   ├── page.tsx            # Projects grid
│   │   └── [slug]/page.tsx     # Individual project case study
│   ├── contact/
│   │   ├── layout.tsx          # Contact page metadata
│   │   └── page.tsx            # Contact form
│   └── api/
│       ├── contact/route.ts    # Nodemailer email handler
│       └── chat/route.ts       # AI SDK chat handler
├── components/
│   ├── ThreeBlob.tsx           # Interactive 3D blob with navigation pins
│   ├── ThreeParticlesBackground.tsx  # Particle field (dynamic imported, ssr:false)
│   ├── BackgroundFX.tsx        # Ambient CSS blob animations (no Framer Motion)
│   ├── BackgroundFXWrapper.tsx # Client wrapper for dynamic import in layout
│   ├── SplashGate.tsx          # Session-aware splash screen controller
│   ├── Hero.tsx                # Hero section with GSAP entrance
│   ├── Experience.tsx          # Work experience timeline
│   ├── MyInfo.tsx              # About/bio section with word-level animations
│   ├── FloatingActionButton.tsx # Mobile nav bar + desktop FAB (pure Tailwind)
│   └── demos/
│       ├── ChatDemo.tsx        # AI chat demo
│       └── QRCodeDemo.tsx      # QR code generator demo
├── lib/
│   ├── projects.ts             # Project data (slug, title, tags, case study content)
│   └── schemas.ts              # Zod schemas (ContactSchema, etc.)
└── hooks/
    └── useGsapContext.ts       # GSAP context + ScrollTrigger setup per section
```

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 11+

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourname/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables (see section below)
cp .env.local.example .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Gmail SMTP — contact form
# Step 1: Enable 2-Step Verification on your Google account
# Step 2: Go to myaccount.google.com/apppasswords → generate an App Password
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# AI Chat demo (optional — only needed for /api/chat)
# Google AI Studio: aistudio.google.com
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# OpenAI (alternative AI provider)
OPENAI_API_KEY=your_key_here
```

> **Never commit `.env.local` to version control.** The `.gitignore` already excludes it.

---

## Available Scripts

| Command              | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Start dev server with Turbopack |
| `npm run build`      | Production build                |
| `npm run start`      | Start production server         |
| `npm run lint`       | Run ESLint                      |
| `npm run test`       | Run Vitest tests once           |
| `npm run test:watch` | Run Vitest in watch mode        |

---

## Docker

The app includes a `Dockerfile` and `docker-compose.yml` for containerized deployment.

```bash
# Build and run with Docker Compose
docker-compose up --build

# The app will be available at http://localhost:3000
# Environment variables are loaded from .env.local via env_file in docker-compose.yml
```

---

## Key Architectural Decisions

### Dynamic imports for heavy libraries

`ThreeParticlesBackground` (Three.js ~170kb) and `BackgroundFX` are dynamically imported with `ssr: false` to defer their load from the initial page bundle, improving LCP.

```ts
const ThreeParticlesBackground = dynamic(
  () => import("@/components/ThreeParticlesBackground"),
  { ssr: false },
);
```

### CSS keyframes for background animations

The three ambient background blobs originally used Framer Motion with `repeat: Infinity` — three permanent JavaScript animation loops running at 60fps. These were replaced with CSS `@keyframes` which run entirely on the browser's compositor thread (no JS, no main-thread cost, auto-paused when the tab is hidden).

### Framer Motion scoped to splash only

The project uses GSAP for all scroll animations and entrance transitions. Framer Motion is only used in `Splash.tsx` (the brief startup screen) to avoid running two animation libraries in the same runtime context.

### Per-route layouts for metadata

`projects/page.tsx` and `contact/page.tsx` are Client Components (`"use client"`), which cannot export `metadata`. Route-specific `layout.tsx` files (Server Components) are used as the metadata boundary instead.

### MUI removed from FloatingActionButton

The original `FloatingActionButton` imported ~10 MUI components (`Box`, `Fab`, `Tooltip`, `Collapse`, `Paper`, `List`…) adding ~50kb to the bundle for a single nav element. Replaced entirely with Tailwind classes and native browser APIs.

---

## Performance Optimizations

| Optimization                                               | Impact                                              |
| ---------------------------------------------------------- | --------------------------------------------------- |
| `ThreeBlob` geometry reduced from 128×128 → 48×48 segments | 16,384 → 2,304 vertices; 7× less GPU work per frame |
| Dynamic import for Three.js components                     | ~170kb deferred from initial load                   |
| `BackgroundFX` moved to CSS animations                     | Eliminates 3 permanent JS animation loops           |
| Splash `minDuration` reduced from 3000ms → 800ms           | −2.2s from LCP                                      |
| Hero title no longer starts at `opacity: 0`                | LCP can fire on headline immediately                |
| MUI removed from FloatingActionButton                      | ~50kb removed from bundle                           |
| `sitemap.xml` + `robots.txt` added                         | Google can discover and index all routes            |
| Per-page Open Graph metadata                               | Rich link previews on social platforms              |

---

## Deployment

The project is configured for **Vercel** (recommended) or any Node.js host via Docker.

### Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Docker / VPS

```bash
docker-compose up -d --build
```

After deploying, submit your sitemap to Google Search Console:
`https://diloma.dev/sitemap.xml`

---

## Testing

```bash
npm run test
```

Tests are located in `src/__tests__/` and cover:

- `ErrorBoundary` component behaviour
- Project data schema validation
- Zod form schemas (`ContactSchema`)

---

## License

MIT — feel free to use this as a reference or starting point for your own portfolio.
