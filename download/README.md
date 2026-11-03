# 🚀 Akash Kushwaha — Interactive Developer Portfolio

A modern, single-page developer portfolio for **Akash Kushwaha** — a Computer Science (AI) undergrad at NIET, Greater Noida — showcasing **skills, projects and a learning journey** with rich visual effects and genuinely **actionable features**: live database-backed likes, a working contact form, a command palette, and a downloadable résumé.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion · Prisma + SQLite**.

---

## ✨ Features

### Visual effects

| Effect | Where |
| --- | --- |
| Typewriter headline (cycles through your roles) | Hero |
| Floating gradient orbs + grid backdrop | Hero |
| Animated stat counters (count up on scroll) | Hero |
| Floating code card with syntax highlighting | Hero |
| Scroll-progress bar (gradient, top of page) | Global |
| Reveal-on-scroll animations on every section | Global |
| Animated gradient skill bars + category tabs | Skills |
| Infinite tech-stack marquee (pauses on hover) | Skills |
| 3D tilt-on-hover project cards + shine sweep | Projects |
| Animated layout transitions when filtering | Projects |
| Alternating animated career timeline | Learning |
| Progress bars for what you're currently learning | Learning |

### Actionable features

| Feature | How it works |
| --- | --- |
| 💬 **Working contact form** | Zod-validated on the server, stored in SQLite via Prisma, toast confirmation |
| ❤️ **Project like buttons** | Optimistic UI → `POST /api/likes` → persisted in the database; one like per visitor per project (localStorage guard) |
| 🎛️ **Project category filters** | All / Web App / AI-ML / Open Source / Mobile with live counts |
| 📄 **Résumé download** | Real PDF served from `public/resume.pdf` (button in navbar, hero and mobile menu) |
| 📋 **Copy email** | One-click clipboard copy with toast feedback (hero + contact section) |
| ⌨️ **Command palette** | Press `Ctrl+K` / `⌘K` — navigate sections, toggle theme, download résumé, copy email, open socials |
| 🌗 **Dark / light mode** | `next-themes` toggle in the navbar, remembers your choice, dark by default |
| 🔝 **Back to top** | Floating button appears after scrolling |
| 📱 **Fully responsive** | Mobile-first layout, hamburger menu, 44px touch targets |
| ♿ **Accessible** | Semantic HTML, ARIA labels/roles, keyboard navigable, `prefers-reduced-motion` respected |

---

## 🛠 Tech stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style) + tw-animate-css
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **Theme**: next-themes (class-based dark mode)
- **Toasts**: Sonner
- **Database**: Prisma ORM with SQLite
- **Validation**: Zod (server-side, contact API)
- **Package manager**: Bun (npm / pnpm / yarn work too)

---

## 📂 Project structure

```
├── prisma/
│   └── schema.prisma          # ContactMessage & ProjectLike models
├── db/
│   └── custom.db              # SQLite database file (auto-created)
├── public/
│   └── resume.pdf             # Downloadable résumé (replace with yours)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Single page — assembles all sections
│   │   ├── layout.tsx         # Fonts, ThemeProvider, metadata, Toaster
│   │   ├── globals.css        # Design system: theme vars, effects, animations
│   │   └── api/
│   │       ├── contact/route.ts   # POST — save contact message
│   │       └── likes/route.ts     # GET/POST — read & increment likes
│   ├── components/
│   │   ├── theme-provider.tsx
│   │   ├── ui/                # shadcn/ui primitives
│   │   └── portfolio/
│   │       ├── navbar.tsx         # Glass nav, active section, mobile menu
│   │       ├── hero.tsx           # Typewriter, orbs, counters, code card
│   │       ├── about.tsx          # Bio, facts, value cards
│   │       ├── skills.tsx         # Tabs, animated bars, marquee
│   │       ├── projects.tsx       # Filters, tilt cards, like buttons
│   │       ├── learning.tsx       # Currently-learning + timeline
│   │       ├── contact.tsx        # Contact form + details
│   │       ├── footer.tsx
│   │       ├── command-palette.tsx# Ctrl+K palette
│   │       ├── scroll-progress.tsx
│   │       ├── back-to-top.tsx
│   │       ├── theme-toggle.tsx
│   │       ├── section-heading.tsx
│   │       └── hooks.tsx          # useTypewriter + CountUp
│   └── lib/
│       ├── portfolio-data.ts  # ★ ALL content lives here — edit this!
│       └── db.ts              # Prisma client singleton
└── package.json
```

---

## 🚀 How to run

### Prerequisites

- **Bun** (recommended): `curl -fsSL https://bun.sh/install | bash` — or **Node.js 20+** with npm/pnpm/yarn
- No external database needed — SQLite is file-based

### 1. Install dependencies

```bash
bun install        # or: npm install
```

### 2. Configure the environment

Create a `.env` file in the project root (already present in this sandbox):

```env
DATABASE_URL=file:/absolute/path/to/project/db/custom.db
```

> On Windows use: `DATABASE_URL="file:./db/custom.db"` (relative paths work too).

### 3. Create the database

```bash
bun run db:push    # creates db/custom.db from prisma/schema.prisma
```

This also generates the Prisma client. Like counts are seeded automatically the first time `GET /api/likes` is called.

### 4. Start the dev server

```bash
bun run dev        # or: npm run dev
```

Open **http://localhost:3000** — the portfolio runs on port **3000** only.

### 5. Production build (optional)

```bash
bun run build      # compiles + copies static assets
bun run start      # serves the optimized production build
```

### Available scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start dev server on port 3000 (hot reload) |
| `bun run build` | Production build |
| `bun run start` | Run the production build |
| `bun run lint` | ESLint check |
| `bun run db:push` | Sync `prisma/schema.prisma` → SQLite |
| `bun run db:generate` | Regenerate the Prisma client |
| `bun run db:reset` | Wipe & re-create the database |

---

## 🔌 API reference

| Method | Route | Body | Response |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | `{ "name": "…", "email": "…", "message": "…" }` | `{ ok: true, id }` — 400 with error message if validation fails |
| `GET` | `/api/likes` | — | `{ likes: { devpulse: 187, … } }` (seeds baseline counts on first call) |
| `POST` | `/api/likes` | `{ "projectId": "devpulse" }` | `{ ok: true, count }` — increments by 1 |

**Database models**

```prisma
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model ProjectLike {
  id        String   @id @default(cuid())
  projectId String   @unique
  count     Int      @default(0)
  updatedAt DateTime @updatedAt
}
```

Inspect saved messages any time:

```bash
sqlite3 db/custom.db "SELECT * FROM ContactMessage ORDER BY createdAt DESC;"
```

---

## 🎨 Personalized content — where it lives

All of Akash's content is centralized in [`src/lib/portfolio-data.ts`](../src/lib/portfolio-data.ts):

- `profile` — name, typewriter roles, tagline, bio (AI + 400+ LeetCode), email, GitHub/LinkedIn, stats
- `skills` / `marqueeTech` — Java, Python, JS/TS, React, Node.js, MongoDB, TensorFlow & more
- `projects` — Resume Analyzer, Bike Rental System, Sales Dashboard, Voice Emotion Detection (add `demoUrl`/`repoUrl` per project once live links exist)
- `timeline` — B.Tech CSE (AI) @ NIET (2023–2027), SIH, 400+ LeetCode milestone, certifications
- `currentlyLearning` — React/Next.js, Node/Express/MongoDB, AI-ML & Generative AI

Other assets:

1. **Résumé** — `public/resume.pdf` is generated from `scripts/make_resume.py` (`python3 scripts/make_resume.py`). Replace that file with your own PDF anytime (keep the filename, or update `resumeUrl` in the data file).
2. **Colors** — theme tokens live in `src/app/globals.css` (`:root` for light, `.dark` for dark). The accent gradient (violet → fuchsia → amber) is in the `text-gradient` utility.
3. **Browser tab title & SEO** — `metadata` in `src/app/layout.tsx`.

**Hot tip:** everything hot-reloads — edit the data file and watch the site update instantly while `bun run dev` is running.

---

## ⌨️ Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+K` / `⌘K` | Open command palette (navigate, toggle theme, download résumé, copy email) |
| `Esc` | Close palette / menus |
| `Tab` | Keyboard navigation (all interactive elements reachable) |

---

## 🌐 Deployment

Works out of the box on **Vercel**:

```bash
npm i -g vercel
vercel          # follow the prompts
```

Checklist before deploying:

- [ ] Set `DATABASE_URL` in your hosting env vars (use `file:./db/custom.db` or switch `prisma/schema.prisma` provider to Postgres for a serverless-friendly DB)
- [ ] Add real repo/demo links to each project in `portfolio-data.ts` (cards auto-swap to "Live demo" buttons when `demoUrl ≠ repoUrl`)
- [ ] Swap in your own résumé PDF
- [ ] Update `metadata` in `src/app/layout.tsx` (title, description, OG tags)

---

## 🧰 Troubleshooting

| Problem | Fix |
| --- | --- |
| `Error: Environment variable not found: DATABASE_URL` | Create the `.env` file (see step 2), then re-run `bun run db:push` |
| Likes all show baseline values again | `db/custom.db` was deleted — the API re-seeds on first `GET /api/likes` |
| Contact form returns 400 | Message needs ≥ 2-char name, valid email, ≥ 10-char message |
| Animations feel heavy | The site respects `prefers-reduced-motion`; enable it at OS level |
| Port 3000 already in use | Stop the other process, or temporarily edit the `dev` script in `package.json` |

---

## 📄 License

Free to use as a personal portfolio template. Replace the sample content and make it shine — attribution appreciated but not required.
