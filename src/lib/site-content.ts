/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SERVER-SIDE SITE CONTENT — reads/writes the editable portfolio content.
 *
 *  Content edited in /admin is stored in the SiteContent table (JSON) and
 *  merged over the defaults in portfolio-data.ts, so partial or legacy
 *  data can never break the site.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { db } from "@/lib/db"
import {
  defaultContent,
  type SiteContent,
  type Stat,
  type Social,
  type SkillGroup,
  type Project,
  type TimelineItem,
  type LearningItem,
} from "@/lib/portfolio-data"

const CONTENT_KEY = "main"

/* ── tiny coercion helpers ─────────────────────────────────────────────── */
const str = (v: unknown, fb: string) =>
  typeof v === "string" && v.trim() !== "" ? v : fb
const optStr = (v: unknown, fb = "") => (typeof v === "string" ? v : fb)
const num = (v: unknown, fb: number) => {
  const n = typeof v === "number" ? v : Number(v)
  return Number.isFinite(n) ? n : fb
}
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))
const strArr = (v: unknown, fb: string[]) =>
  Array.isArray(v) ? v.map((x) => String(x ?? "").trim()).filter(Boolean) : fb

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

/** Normalize any unknown payload into a safe SiteContent (falls back to defaults). */
export function sanitizeContent(raw: unknown): SiteContent {
  const d = defaultContent
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>
  const p = (r.profile && typeof r.profile === "object" ? r.profile : {}) as Record<string, unknown>

  /* profile → stats */
  const stats: Stat[] = Array.isArray(p.stats)
    ? p.stats.map((s, i) => {
        const it = (s && typeof s === "object" ? s : {}) as Record<string, unknown>
        const fb = d.profile.stats[Math.min(i, d.profile.stats.length - 1)]
        return {
          label: str(it.label, fb.label),
          value: Math.round(num(it.value, fb.value)),
          suffix: optStr(it.suffix, fb.suffix),
        }
      })
    : d.profile.stats

  /* profile → socials */
  const socials: Social[] = Array.isArray(p.socials)
    ? p.socials.map((s) => {
        const it = (s && typeof s === "object" ? s : {}) as Record<string, unknown>
        return {
          label: str(it.label, "Link"),
          url: optStr(it.url, "#"),
          icon: str(it.icon, "github"),
        }
      })
    : d.profile.socials

  const profile = {
    name: str(p.name, d.profile.name),
    firstName: str(p.firstName, d.profile.firstName),
    initials: str(p.initials, d.profile.initials),
    roles: strArr(p.roles, d.profile.roles),
    tagline: str(p.tagline, d.profile.tagline),
    location: str(p.location, d.profile.location),
    address: optStr(p.address, d.profile.address),
    phone: optStr(p.phone, d.profile.phone),
    email: str(p.email, d.profile.email),
    resumeUrl: str(p.resumeUrl, d.profile.resumeUrl),
    resumeName: str(p.resumeName, d.profile.resumeName),
    bio: strArr(p.bio, d.profile.bio),
    stats,
    socials,
  }

  /* skills */
  const skills: SkillGroup[] = Array.isArray(r.skills)
    ? r.skills.map((g) => {
        const it = (g && typeof g === "object" ? g : {}) as Record<string, unknown>
        const items = Array.isArray(it.items)
          ? it.items.map((s) => {
              const si = (s && typeof s === "object" ? s : {}) as Record<string, unknown>
              return {
                name: str(si.name, "Skill"),
                level: clamp(Math.round(num(si.level, 50)), 0, 100),
                note: optStr(si.note, ""),
              }
            })
          : []
        return {
          category: str(it.category, "Skills"),
          blurb: optStr(it.blurb, ""),
          items,
        }
      })
    : d.skills

  const marqueeTech = strArr(r.marqueeTech, d.marqueeTech)

  /* projects */
  const projects: Project[] = Array.isArray(r.projects)
    ? r.projects.map((pr, i) => {
        const it = (pr && typeof pr === "object" ? pr : {}) as Record<string, unknown>
        const title = str(it.title, `Project ${i + 1}`)
        return {
          id: str(it.id, "") || slugify(title) || `project-${i + 1}`,
          title,
          tagline: optStr(it.tagline, ""),
          description: optStr(it.description, ""),
          category: str(it.category, "Web App"),
          emoji: optStr(it.emoji, "🚀"),
          gradient: optStr(it.gradient, "from-violet-600 via-fuchsia-500 to-pink-500"),
          tech: strArr(it.tech, []),
          initialLikes: Math.max(0, Math.round(num(it.initialLikes, 0))),
          demoUrl: optStr(it.demoUrl, ""),
          repoUrl: optStr(it.repoUrl, ""),
          highlight: optStr(it.highlight, ""),
        }
      })
    : d.projects

  /* timeline */
  const timeline: TimelineItem[] = Array.isArray(r.timeline)
    ? r.timeline.map((t) => {
        const it = (t && typeof t === "object" ? t : {}) as Record<string, unknown>
        return {
          period: optStr(it.period, ""),
          title: str(it.title, "Milestone"),
          place: optStr(it.place, ""),
          description: optStr(it.description, ""),
          tags: strArr(it.tags, []),
          current: it.current === true,
        }
      })
    : d.timeline

  /* currently learning */
  const currentlyLearning: LearningItem[] = Array.isArray(r.currentlyLearning)
    ? r.currentlyLearning.map((l) => {
        const it = (l && typeof l === "object" ? l : {}) as Record<string, unknown>
        return {
          name: str(it.name, "New skill"),
          progress: clamp(Math.round(num(it.progress, 50)), 0, 100),
          icon: optStr(it.icon, "🚀"),
        }
      })
    : d.currentlyLearning

  return { profile, skills, marqueeTech, projects, timeline, currentlyLearning }
}

/** Read the stored content (or the defaults when nothing was saved yet). */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const row = await db.siteContent.findUnique({ where: { id: CONTENT_KEY } })
    if (!row) return defaultContent
    return sanitizeContent(JSON.parse(row.data))
  } catch (err) {
    console.error("[site-content] read failed — using defaults", err)
    return defaultContent
  }
}

/** Persist content and return the sanitized version that was stored. */
export async function saveSiteContent(input: unknown): Promise<SiteContent> {
  const clean = sanitizeContent(input)
  const data = JSON.stringify(clean)
  await db.siteContent.upsert({
    where: { id: CONTENT_KEY },
    update: { data },
    create: { id: CONTENT_KEY, data },
  })
  return clean
}

/** Remove stored overrides → site falls back to defaults again. */
export async function resetSiteContent(): Promise<void> {
  await db.siteContent.deleteMany({ where: { id: CONTENT_KEY } })
}
