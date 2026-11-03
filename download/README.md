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
| 🎛️ **Project category filters** | Chips auto-derive from the live project list (All / AI · ML / Web App) with live counts |
| 📄 **Résumé download** | Akash's real résumé PDF served from `public/resume.pdf` (button in navbar, hero and mobile menu) |
| ✏️ **Admin content editor** | `/admin` — form-based editor for every section; saved edits are stored in SQLite and go live instantly |
| 📋 **Copy email** | One-click clipboard copy with toast feedback (hero + contact section) |
| ⌨️ **Command palette** | Press `Ctrl+K` / `⌘K` — navigate sections, toggle theme, download résumé, copy email, open admin, open socials |
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
│   └── schema.prisma          # ContactMessage, ProjectLike & SiteContent models
├── db/
│   └── custom.db              # SQLite database file (auto-created)
├── public/
│   └── resume.pdf             # Akash's real résumé PDF
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home — loads saved content and renders all sections
│   │   ├── admin/page.tsx     # ✏️ /admin — form editor for every content section
│   │   ├── layout.tsx         # Fonts, ThemeProvider, metadata, Toaster
│   │   ├── globals.css        # Design system: theme vars, effects, animations
│   │   └── api/
│   │       ├── contact/route.ts   # POST — save contact message
│   │       ├── likes/route.ts     # GET/POST — read & increment likes
│   │       └── content/route.ts   # GET/PUT/DELETE — read & save editable content
│   ├── components/
│   │   ├── theme-provider.tsx
│   │   ├── ui/                # shadcn/ui primitives
│   │   └── portfolio/
│   │       ├── content-provider.tsx # React context serving the live content
│   │       ├── navbar.tsx         # Glass nav, active section, mobile menu
│   │       ├── hero.tsx           # Typewriter, orbs, counters, code card
│   │       ├── about.tsx          # Bio, facts, value cards
│   │       ├── skills.tsx         # Tabs, animated bars, marquee
│   │       ├── projects.tsx       # Filters, tilt cards, like buttons
│   │       ├── learning.tsx       # Currently-learning + timeline
│   │       ├── contact.tsx        # Contact form + details (email, phone, address)
│   │       ├── footer.tsx         # Socials, copyright, “Site admin” link
│   │       ├── command-palette.tsx# Ctrl+K palette
│   │       ├── scroll-progress.tsx
│   │       ├── back-to-top.tsx
│   │       ├── theme-toggle.tsx
│   │       ├── section-heading.tsx
│   │       └── hooks.tsx          # useTypewriter + CountUp
│   └── lib/
│       ├── portfolio-data.ts  # ★ Default content + TypeScript types
│       ├── site-content.ts    # ★ Reads/writes saved edits (DB) merged over defaults
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
ADMIN_PASSWORD=akash2027
```

> On Windows use: `DATABASE_URL="file:./db/custom.db"` (relative paths work too).
> `ADMIN_PASSWORD` protects the `/admin` editor — change it before deploying.

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
| `GET` | `/api/likes` | — | `{ likes: { "resume-analyzer": 18, … } }` (seeds baseline counts on first call) |
| `POST` | `/api/likes` | `{ "projectId": "resume-analyzer" }` | `{ ok: true, count }` — increments by 1 |
| `GET` | `/api/content` | — | Full live portfolio content (defaults merged with saved edits) |
| `GET` | `/api/content?defaults=1` | — | The built-in defaults from `portfolio-data.ts` |
| `PUT` | `/api/content` | Full content JSON + `x-admin-pass` header | `{ ok: true, content }` — 401 if passcode is wrong |
| `DELETE` | `/api/content` | `x-admin-pass` header | Resets the site to defaults |

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

model SiteContent {
  id        String   @id @default("main")
  data      String   // JSON blob written by the /admin editor
  updatedAt DateTime @updatedAt
}
```

Inspect saved messages any time:

```bash
sqlite3 db/custom.db "SELECT * FROM ContactMessage ORDER BY createdAt DESC;"
```

---

## ✏️ Editing content from the browser — the `/admin` panel

No code needed for day-to-day updates: open **`/admin`** (link is in the footer → “Site admin”, or press `Ctrl+K` → “Open admin panel”), enter the passcode and edit any section through forms.

- **Passcode**: set in `.env` as `ADMIN_PASSWORD` (currently `akash2027`). The editor remembers it for the browser session.
- **Editable sections** (tabs):
  - **Profile & Contact** — name, initials, email, phone, short location, full address, hero tagline, typewriter roles (one per line), bio paragraphs (blank line between), résumé file/name, social links (GitHub / LinkedIn / Twitter / LeetCode icons)
  - **Stats** — the four counter cards (label, number, suffix)
  - **Skills** — categories/tabs, each skill's name, level % and note
  - **Projects** — add/remove projects and edit title, ID, category chip, emoji, highlight badge, gradient, tech stack (comma separated), repo/demo URLs, tagline, description, initial likes
  - **Learning** — the “in progress” cards (name, progress %, icon)
  - **Timeline** — milestones (period badge, title, place, description, tags, “current” highlight)
  - **Tech marquee** — the scrolling chip list (comma separated)
- **Save changes** → stored in the `SiteContent` table → the live site updates immediately (just refresh).
- **Load defaults** → fills the form with the built-in defaults (nothing changes until you save).
- **Reset saved edits** → deletes all stored edits; the site reverts to `portfolio-data.ts` defaults.

> New projects are liked-counted automatically — give each one a unique lowercase-with-dashes **ID** (e.g. `my-new-project`).

---

## 🎨 Default content — where it lives

The built-in content is centralized in [`src/lib/portfolio-data.ts`](../src/lib/portfolio-data.ts) (the `/admin` panel edits override it at runtime):

- `profile` — name, typewriter roles, tagline, bio (AI + 400+ LeetCode in Java), email, phone, **Sasni (Gopal Nagar), Hathras, UP - 204216** address, GitHub / LinkedIn / LeetCode links, stats
- `skills` / `marqueeTech` — Java, JS/TS, SQL & DSA, React, HTML/CSS, Tailwind, Next.js, Node.js, Express.js, MongoDB, Git, Gemini API
- `projects` — **Resume Analyzer** (AI/ML · Gemini API) and **Bike Rental Management System** (Web App · MERN). Update `repoUrl`/`demoUrl` per project (in `/admin`) once the real repo links are ready
- `timeline` — B.Tech CSE (AI) @ NIET (2023–2027, CGPA 7.98), Smart India Hackathon 2025, 400+ LeetCode milestone, shipped projects, certifications (Infosys Springboard · be10x)
- `currentlyLearning` — Advanced Java & DSA, React/Next.js, Node/Express/MongoDB, AI/ML & Generative AI

Other assets:

1. **Résumé** — `public/resume.pdf` is Akash's actual uploaded résumé. Swap the file anytime (keep the name, or change `resumeUrl` in the admin panel).
2. **Colors** — theme tokens live in `src/app/globals.css` (`:root` for light, `.dark` for dark). The accent gradient (violet → fuchsia → amber) is in the `text-gradient` utility.
3. **Browser tab title & SEO** — `metadata` in `src/app/layout.tsx`.

**Hot tip:** code edits to `portfolio-data.ts` hot-reload; admin-panel edits apply on save (refresh the home page to see them).

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
- [ ] Set a strong `ADMIN_PASSWORD` env var (it protects `/admin`)
- [ ] Add real repo/demo links to each project in the `/admin` panel (cards auto-swap to "Live demo" buttons when `demoUrl ≠ repoUrl`)
- [ ] The résumé PDF is already in place (`public/resume.pdf`)
- [ ] Update `metadata` in `src/app/layout.tsx` (title, description, OG tags)

---

## 🧰 Troubleshooting

| Problem | Fix |
| --- | --- |
| `Error: Environment variable not found: DATABASE_URL` | Create the `.env` file (see step 2), then re-run `bun run db:push` |
| `/admin` says "Wrong admin passcode" | The passcode is `ADMIN_PASSWORD` from `.env` (default `akash2027`) |
| Admin edits don't appear on the site | Refresh the home page — content is read from the DB on every request |
| Likes all show baseline values again | `db/custom.db` was deleted — the API re-seeds on first `GET /api/likes` |
| Contact form returns 400 | Message needs ≥ 2-char name, valid email, ≥ 10-char message |
| Animations feel heavy | The site respects `prefers-reduced-motion`; enable it at OS level |
| Port 3000 already in use | Stop the other process, or temporarily edit the `dev` script in `package.json` |

---

## 📄 License

Free to use as a personal portfolio template. Replace the sample content and make it shine — attribution appreciated but not required.
