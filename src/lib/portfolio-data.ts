/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this single file to make the site yours.
 *  Swap the name, bio, skills, projects and timeline below.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Alex Carter",
  firstName: "Alex",
  roles: [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Open-Source Contributor",
    "Lifelong Learner",
  ],
  tagline:
    "I design and build fast, delightful web products — from pixel-perfect interfaces to resilient backends.",
  location: "Shanghai, China",
  email: "alex.carter@example.com",
  resumeUrl: "/resume.pdf",
  bio: [
    "I'm a full-stack developer with 5+ years of experience turning ideas into production software. My sweet spot is the intersection of thoughtful design and solid engineering — shipping products that look great, load fast and scale.",
    "Right now I'm deep into AI-powered applications, real-time systems and developer tooling. When I'm not coding, I'm writing technical notes, contributing to open source, or mentoring junior devs in my community.",
  ],
  stats: [
    { label: "Years of Experience", value: 5, suffix: "+" },
    { label: "Projects Shipped", value: 32, suffix: "+" },
    { label: "Technologies", value: 18, suffix: "+" },
    { label: "GitHub Stars", value: 2400, suffix: "+" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/alexcarter", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/alexcarter", icon: "linkedin" },
    { label: "X / Twitter", url: "https://x.com/alexcarter", icon: "twitter" },
  ],
} as const;

export type SkillCategory = "Frontend" | "Backend" | "Tools & DevOps";

export const skills: {
  category: SkillCategory;
  blurb: string;
  items: { name: string; level: number; note: string }[];
}[] = [
  {
    category: "Frontend",
    blurb: "Interfaces that feel instant, fluid and alive.",
    items: [
      { name: "React / Next.js", level: 95, note: "App Router, RSC, streaming" },
      { name: "TypeScript", level: 92, note: "Strict typing, generics, DX" },
      { name: "Tailwind / shadcn/ui", level: 90, note: "Design systems at speed" },
      { name: "Framer Motion / CSS", level: 85, note: "Motion & micro-interactions" },
    ],
  },
  {
    category: "Backend",
    blurb: "APIs and data layers that just don't break.",
    items: [
      { name: "Node.js / Bun", level: 90, note: "REST, streaming, workers" },
      { name: "PostgreSQL / Prisma", level: 85, note: "Modeling, tuning, migrations" },
      { name: "Python", level: 78, note: "Data scripts & AI integrations" },
      { name: "WebSockets / Realtime", level: 82, note: "Presence, chat, live dashboards" },
    ],
  },
  {
    category: "Tools & DevOps",
    blurb: "Ship confidently, measure everything.",
    items: [
      { name: "Git & CI/CD", level: 90, note: "GitHub Actions, pipelines" },
      { name: "Docker", level: 84, note: "Containers, compose, images" },
      { name: "AWS / Vercel", level: 80, note: "Deploys, edge, observability" },
      { name: "Testing (Vitest, Playwright)", level: 86, note: "Unit → E2E coverage" },
    ],
  },
];

export const marqueeTech = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "AWS",
  "Python",
  "Framer Motion",
  "WebSockets",
  "GraphQL",
  "Redis",
  "Zustand",
  "Playwright",
];

export type ProjectCategory = "Web App" | "AI / ML" | "Open Source" | "Mobile";

export const projects: {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  emoji: string;
  gradient: string;
  tech: string[];
  stars: number;
  initialLikes: number;
  demoUrl: string;
  repoUrl: string;
  highlight: string;
}[] = [
  {
    id: "devpulse",
    title: "DevPulse",
    tagline: "Real-time team analytics platform",
    description:
      "A live dashboard that streams commit, PR and deploy events into beautiful velocity charts. WebSocket-first, sub-second updates, dark mode everything.",
    category: "Web App",
    emoji: "⚡",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
    tech: ["Next.js", "WebSockets", "PostgreSQL", "Recharts"],
    stars: 2100,
    initialLikes: 187,
    demoUrl: "https://devpulse.example.com",
    repoUrl: "https://github.com/alexcarter/devpulse",
    highlight: "2.1k GitHub stars",
  },
  {
    id: "pathfinder",
    title: "PathFinder",
    tagline: "AI study planner for students",
    description:
      "An AI copilot that turns a syllabus into a personalized week-by-week plan, adapts when you fall behind, and keeps motivation high with streaks.",
    category: "AI / ML",
    emoji: "🧭",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    tech: ["Next.js", "OpenAI", "Prisma", "Zustand"],
    stars: 840,
    initialLikes: 132,
    demoUrl: "https://pathfinder.example.com",
    repoUrl: "https://github.com/alexcarter/pathfinder",
    highlight: "8k+ active students",
  },
  {
    id: "chartcraft",
    title: "ChartCraft",
    tagline: "Open-source SVG chart kit",
    description:
      "A tiny, dependency-free chart library with sensible defaults, full a11y and delightful animations. Tree-shakeable down to 4kb per chart.",
    category: "Open Source",
    emoji: "📊",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    tech: ["TypeScript", "SVG", "Zero deps"],
    stars: 1250,
    initialLikes: 98,
    demoUrl: "https://chartcraft.example.com",
    repoUrl: "https://github.com/alexcarter/chartcraft",
    highlight: "4kb gzipped",
  },
  {
    id: "mealmetric",
    title: "MealMetric",
    tagline: "Nutrition tracking PWA",
    description:
      "Snap a photo, get macros instantly. Offline-first PWA with background sync, barcode scanning and a weekly insights newsletter.",
    category: "Mobile",
    emoji: "🥗",
    gradient: "from-lime-500 via-emerald-500 to-teal-600",
    tech: ["React", "PWA", "TensorFlow.js", "IndexedDB"],
    stars: 460,
    initialLikes: 76,
    demoUrl: "https://mealmetric.example.com",
    repoUrl: "https://github.com/alexcarter/mealmetric",
    highlight: "100 Lighthouse PWA",
  },
  {
    id: "codecanvas",
    title: "CodeCanvas",
    tagline: "Collaborative code whiteboard",
    description:
      "Explain algorithms visually — draw, type and run code snippets together in real time with multiplayer cursors and session replay.",
    category: "Web App",
    emoji: "🎨",
    gradient: "from-fuchsia-600 via-purple-600 to-violet-700",
    tech: ["Next.js", "Yjs", "Canvas API", "Redis"],
    stars: 980,
    initialLikes: 121,
    demoUrl: "https://codecanvas.example.com",
    repoUrl: "https://github.com/alexcarter/codecanvas",
    highlight: "Multiplayer CRDT sync",
  },
  {
    id: "promptly",
    title: "Promptly",
    tagline: "Prompt engineering playground",
    description:
      "Version, diff and A/B test prompts across models. Evaluate with custom scorers and export battle-tested prompt packs to your codebase.",
    category: "AI / ML",
    emoji: "✨",
    gradient: "from-rose-500 via-pink-600 to-fuchsia-700",
    tech: ["Next.js", "Edge runtime", "Zod", "SQLite"],
    stars: 1530,
    initialLikes: 164,
    demoUrl: "https://promptly.example.com",
    repoUrl: "https://github.com/alexcarter/promptly",
    highlight: "A/B eval scoring",
  },
];

export const timeline: {
  period: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
  current?: boolean;
}[] = [
  {
    period: "2023 — Now",
    title: "Senior Full-Stack Developer",
    place: "Nova Labs",
    description:
      "Leading the platform team: rebuilt the core dashboard (58% faster loads), introduced realtime infra and mentor three junior engineers.",
    tags: ["Next.js", "Realtime", "Leadership"],
    current: true,
  },
  {
    period: "2023",
    title: "AWS Certified Developer",
    place: "Associate Level",
    description:
      "Leveled up cloud fundamentals — serverless architectures, IAM done right, and cost-aware deployments.",
    tags: ["AWS", "Cloud", "Certification"],
  },
  {
    period: "2021 — 2023",
    title: "Full-Stack Developer",
    place: "Brightline Studio",
    description:
      "Shipped 12 client products across fintech and education. Owned everything from schema design to deployment pipelines.",
    tags: ["TypeScript", "Node.js", "AWS"],
  },
  {
    period: "2020",
    title: "First Open-Source Milestone",
    place: "ChartCraft v1.0",
    description:
      "Released my own charting kit; it found its first 100 real users and taught me more about APIs than any course.",
    tags: ["Open Source", "Community"],
  },
  {
    period: "2019 — 2021",
    title: "Frontend Developer",
    place: "PixelForge",
    description:
      "Cut my teeth on accessible, responsive UI and built the shared component library adopted by four teams.",
    tags: ["React", "A11y", "Design Systems"],
  },
  {
    period: "2015 — 2019",
    title: "B.Sc. Computer Science",
    place: "University of Technology",
    description:
      "Fell in love with systems programming and human-computer interaction. Ran the web dev society in senior year.",
    tags: ["CS Fundamentals", "Algorithms"],
  },
];

export const currentlyLearning = [
  { name: "AI Agents & RAG Systems", progress: 65, icon: "🤖" },
  { name: "Rust for CLI tooling", progress: 40, icon: "🦀" },
  { name: "Advanced System Design", progress: 55, icon: "🏗️" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
] as const;

export type SectionId = "about" | "skills" | "projects" | "learning" | "contact";
