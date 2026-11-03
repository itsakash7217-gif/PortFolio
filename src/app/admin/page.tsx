"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Lock,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"
import type {
  LearningItem,
  Profile,
  Project,
  SiteContent,
  SkillGroup,
  Social,
  TimelineItem,
} from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

const PASS_KEY = "portfolio.adminPass"

type TabKey =
  | "profile"
  | "stats"
  | "skills"
  | "projects"
  | "learning"
  | "timeline"
  | "marquee"

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile & Contact" },
  { key: "stats", label: "Stats" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "learning", label: "Learning" },
  { key: "timeline", label: "Timeline" },
  { key: "marquee", label: "Tech marquee" },
]

/* ── form primitives ───────────────────────────────────────────────────── */

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-background/70 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
const areaCls =
  "w-full resize-y rounded-lg border border-input bg-background/70 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  hint?: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={String(value)}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      {hint ? (
        <span className="text-[11px] leading-snug text-muted-foreground/70">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

function LabeledArea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
  hint?: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={areaCls}
      />
      {hint ? (
        <span className="text-[11px] leading-snug text-muted-foreground/70">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

function Card({
  title,
  children,
  onRemove,
}: {
  title: string
  children: React.ReactNode
  onRemove?: () => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="truncate text-sm font-semibold">{title}</h3>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${title}`}
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-destructive/30 text-destructive/80 transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="size-4" />
          </button>
        ) : null}
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  )
}

function AddBtn({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      <Plus className="size-4" />
      {children}
    </button>
  )
}

function RowRemove({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove row"
      className="mt-auto grid size-10 place-items-center rounded-lg border border-destructive/30 text-destructive/80 transition-colors hover:bg-destructive/10"
    >
      <Trash2 className="size-4" />
    </button>
  )
}

/* ── page ──────────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [pass, setPass] = useState("")
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<TabKey>("profile")

  /* load content + remembered passcode */
  useEffect(() => {
    const saved = sessionStorage.getItem(PASS_KEY) ?? ""
    setPass(saved)
    fetch("/api/content")
      .then((r) => r.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => toast.error("Could not load portfolio content"))

    if (saved) {
      fetch("/api/content?verify=1", {
        headers: { "x-admin-pass": saved },
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.authorized) setAuthed(true)
          else sessionStorage.removeItem(PASS_KEY)
        })
        .catch(() => {})
        .finally(() => setChecking(false))
    } else {
      setChecking(false)
    }
  }, [])

  const unlock = () => {
    fetch("/api/content?verify=1", {
      headers: { "x-admin-pass": pass },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.authorized) {
          sessionStorage.setItem(PASS_KEY, pass)
          setAuthed(true)
          toast.success("Editor unlocked")
        } else {
          toast.error("Wrong passcode — check ADMIN_PASSWORD in .env")
        }
      })
      .catch(() => toast.error("Verification failed"))
  }

  const save = async () => {
    if (!content) return
    setSaving(true)
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pass": pass,
        },
        body: JSON.stringify(content),
      })
      const json = await res.json()
      if (res.status === 401) {
        toast.error("Wrong passcode — cannot save.")
        setAuthed(false)
        sessionStorage.removeItem(PASS_KEY)
      } else if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Save failed")
      } else {
        setContent(json.content as SiteContent)
        toast.success("Saved — your portfolio is updated 🎉")
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not save changes"
      )
    } finally {
      setSaving(false)
    }
  }

  const loadDefaults = async () => {
    try {
      const res = await fetch("/api/content?defaults=1")
      const data = (await res.json()) as SiteContent
      setContent(data)
      toast.info("Defaults loaded into the form — press Save to apply")
    } catch {
      toast.error("Could not load defaults")
    }
  }

  const resetSaved = async () => {
    if (
      !window.confirm(
        "Delete all saved edits and restore the site to the built-in defaults?"
      )
    )
      return
    try {
      const res = await fetch("/api/content", {
        method: "DELETE",
        headers: { "x-admin-pass": pass },
      })
      if (res.status === 401) {
        toast.error("Wrong passcode — cannot reset.")
        return
      }
      toast.success("Site reset to defaults")
      window.location.reload()
    } catch {
      toast.error("Could not reset")
    }
  }

  /* ── update helpers ──────────────────────────────────────────────────── */
  const setProfile = (patch: Partial<Profile>) =>
    setContent((c) => (c ? { ...c, profile: { ...c.profile, ...patch } } : c))

  const setSocial = (i: number, patch: Partial<Social>) =>
    setProfile({
      socials: content!.profile.socials.map((s, x) =>
        x === i ? { ...s, ...patch } : s
      ),
    })

  const setStat = (i: number, patch: Partial<Profile["stats"][number]>) =>
    setProfile({
      stats: content!.profile.stats.map((s, x) =>
        x === i ? { ...s, ...patch } : s
      ),
    })

  const setSkillGroup = (g: number, patch: Partial<SkillGroup>) =>
    setContent((c) =>
      c
        ? {
            ...c,
            skills: c.skills.map((grp, x) =>
              x === g ? { ...grp, ...patch } : grp
            ),
          }
        : c
    )

  const setSkillItem = (g: number, i: number, patch: Partial<SkillGroup["items"][number]>) =>
    setSkillGroup(g, {
      items: content!.skills[g].items.map((it, x) =>
        x === i ? { ...it, ...patch } : it
      ),
    })

  const setProject = (i: number, patch: Partial<Project>) =>
    setContent((c) =>
      c
        ? {
            ...c,
            projects: c.projects.map((p, x) =>
              x === i ? { ...p, ...patch } : p
            ),
          }
        : c
    )

  const setLearning = (i: number, patch: Partial<LearningItem>) =>
    setContent((c) =>
      c
        ? {
            ...c,
            currentlyLearning: c.currentlyLearning.map((l, x) =>
              x === i ? { ...l, ...patch } : l
            ),
          }
        : c
    )

  const setTimeline = (i: number, patch: Partial<TimelineItem>) =>
    setContent((c) =>
      c
        ? {
            ...c,
            timeline: c.timeline.map((t, x) =>
              x === i ? { ...t, ...patch } : t
            ),
          }
        : c
    )

  /* ── gate ────────────────────────────────────────────────────────────── */
  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card/70 p-6 shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
              <Lock className="size-5" />
            </span>
            <div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                Portfolio admin
              </h1>
              <p className="text-xs text-muted-foreground">
                Enter the admin passcode to edit site content
              </p>
            </div>
          </div>
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Passcode
            </span>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="••••••••"
              className={inputCls}
              autoFocus
            />
          </label>
          <button
            type="button"
            onClick={unlock}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.02]"
          >
            <Lock className="size-4" /> Unlock editor
          </button>
          <Link
            href="/"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" /> Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-sm text-muted-foreground">
        Could not load portfolio content. Refresh the page to try again.
      </div>
    )
  }

  const p = content.profile

  return (
    <div className="min-h-screen">
      {/* top bar */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to site
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadDefaults}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <RotateCcw className="size-3.5" /> Load defaults
            </button>
            <button
              type="button"
              onClick={resetSaved}
              className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive/90 transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5" /> Reset saved edits
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              View site <ExternalLink className="size-3.5" />
            </a>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-fuchsia-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-fuchsia-500/25 transition-transform hover:scale-105 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              Save changes
            </button>
          </div>
        </div>
        {/* tabs */}
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 pb-3">
          <div className="flex w-max gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  tab === t.key
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-600 dark:text-amber-400">
          Changes here update the live portfolio immediately after you press{" "}
          <strong>Save changes</strong>. Typewriter roles are one per line; bio
          paragraphs are separated by a blank line; tech lists are
          comma-separated.
        </p>

        {/* ── PROFILE & CONTACT ─────────────────────────────────────── */}
        {tab === "profile" && (
          <div className="grid gap-4">
            <div className="grid gap-4 rounded-xl border border-border bg-card/60 p-4 md:grid-cols-2">
              <LabeledInput
                label="Full name"
                value={p.name}
                onChange={(v) => setProfile({ name: v })}
              />
              <LabeledInput
                label="First name"
                value={p.firstName}
                onChange={(v) => setProfile({ firstName: v })}
              />
              <LabeledInput
                label="Logo initials"
                value={p.initials}
                onChange={(v) => setProfile({ initials: v })}
                hint="Shown in the navbar & footer (e.g. AK)"
              />
              <LabeledInput
                label="Email"
                type="email"
                value={p.email}
                onChange={(v) => setProfile({ email: v })}
              />
              <LabeledInput
                label="Phone"
                value={p.phone}
                onChange={(v) => setProfile({ phone: v })}
              />
              <LabeledInput
                label="Location (short)"
                value={p.location}
                onChange={(v) => setProfile({ location: v })}
                hint="Shown in the hero & about section"
              />
              <div className="md:col-span-2">
                <LabeledArea
                  label="Full address"
                  rows={2}
                  value={p.address}
                  onChange={(v) => setProfile({ address: v })}
                  hint="Shown under the location in the contact card"
                />
              </div>
              <div className="md:col-span-2">
                <LabeledArea
                  label="Hero tagline"
                  rows={2}
                  value={p.tagline}
                  onChange={(v) => setProfile({ tagline: v })}
                />
              </div>
              <LabeledArea
                label="Typewriter roles (one per line)"
                rows={4}
                value={p.roles.join("\n")}
                onChange={(v) =>
                  setProfile({
                    roles: v
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
              <LabeledArea
                label="Bio paragraphs (separate with a blank line)"
                rows={4}
                value={p.bio.join("\n\n")}
                onChange={(v) =>
                  setProfile({
                    bio: v
                      .split(/\n\s*\n/)
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
              <LabeledInput
                label="Resume file path"
                value={p.resumeUrl}
                onChange={(v) => setProfile({ resumeUrl: v })}
                hint="PDF placed inside the public/ folder"
              />
              <LabeledInput
                label="Resume download filename"
                value={p.resumeName}
                onChange={(v) => setProfile({ resumeName: v })}
              />
            </div>

            <h2 className="mt-2 text-sm font-semibold">Social links</h2>
            {p.socials.map((s, i) => (
              <Card
                key={i}
                title={s.label || `Link ${i + 1}`}
                onRemove={() =>
                  setProfile({
                    socials: p.socials.filter((_, x) => x !== i),
                  })
                }
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <LabeledInput
                    label="Label"
                    value={s.label}
                    onChange={(v) => setSocial(i, { label: v })}
                  />
                  <LabeledInput
                    label="URL"
                    value={s.url}
                    onChange={(v) => setSocial(i, { url: v })}
                  />
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Icon
                    </span>
                    <select
                      value={s.icon}
                      onChange={(e) => setSocial(i, { icon: e.target.value })}
                      className={inputCls}
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="leetcode">LeetCode</option>
                    </select>
                  </label>
                </div>
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setProfile({
                  socials: [
                    ...p.socials,
                    { label: "New link", url: "https://", icon: "github" },
                  ],
                })
              }
            >
              Add social link
            </AddBtn>
          </div>
        )}

        {/* ── STATS ─────────────────────────────────────────────────── */}
        {tab === "stats" && (
          <div className="grid gap-4">
            {p.stats.map((s, i) => (
              <Card
                key={i}
                title={s.label || `Stat ${i + 1}`}
                onRemove={() =>
                  setProfile({ stats: p.stats.filter((_, x) => x !== i) })
                }
              >
                <div className="grid gap-3 sm:grid-cols-[1fr_130px_130px]">
                  <LabeledInput
                    label="Label"
                    value={s.label}
                    onChange={(v) => setStat(i, { label: v })}
                  />
                  <LabeledInput
                    label="Value"
                    type="number"
                    value={s.value}
                    onChange={(v) =>
                      setStat(i, { value: Math.round(Number(v) || 0) })
                    }
                  />
                  <LabeledInput
                    label="Suffix"
                    value={s.suffix}
                    onChange={(v) => setStat(i, { suffix: v })}
                    hint="e.g. +"
                  />
                </div>
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setProfile({
                  stats: [
                    ...p.stats,
                    { label: "New stat", value: 1, suffix: "+" },
                  ],
                })
              }
            >
              Add stat
            </AddBtn>
          </div>
        )}

        {/* ── SKILLS ────────────────────────────────────────────────── */}
        {tab === "skills" && (
          <div className="grid gap-4">
            {content.skills.map((g, gi) => (
              <Card
                key={gi}
                title={g.category || `Category ${gi + 1}`}
                onRemove={() =>
                  setContent((c) =>
                    c
                      ? { ...c, skills: c.skills.filter((_, x) => x !== gi) }
                      : c
                  )
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <LabeledInput
                    label="Category name (tab title)"
                    value={g.category}
                    onChange={(v) => setSkillGroup(gi, { category: v })}
                  />
                  <LabeledInput
                    label="Blurb"
                    value={g.blurb}
                    onChange={(v) => setSkillGroup(gi, { blurb: v })}
                  />
                </div>
                <div className="grid gap-2">
                  {g.items.map((it, i) => (
                    <div
                      key={i}
                      className="grid gap-2 rounded-lg border border-border/60 p-2.5 sm:grid-cols-[1.1fr_90px_1.4fr_40px]"
                    >
                      <LabeledInput
                        label="Skill"
                        value={it.name}
                        onChange={(v) => setSkillItem(gi, i, { name: v })}
                      />
                      <LabeledInput
                        label="Level %"
                        type="number"
                        value={it.level}
                        onChange={(v) =>
                          setSkillItem(gi, i, {
                            level: Math.min(
                              100,
                              Math.max(0, Math.round(Number(v) || 0))
                            ),
                          })
                        }
                      />
                      <LabeledInput
                        label="Note"
                        value={it.note}
                        onChange={(v) => setSkillItem(gi, i, { note: v })}
                      />
                      <RowRemove
                        onClick={() =>
                          setSkillGroup(gi, {
                            items: g.items.filter((_, x) => x !== i),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <AddBtn
                  onClick={() =>
                    setSkillGroup(gi, {
                      items: [
                        ...g.items,
                        { name: "New skill", level: 60, note: "" },
                      ],
                    })
                  }
                >
                  Add skill
                </AddBtn>
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setContent((c) =>
                  c
                    ? {
                        ...c,
                        skills: [
                          ...c.skills,
                          {
                            category: "New category",
                            blurb: "",
                            items: [
                              { name: "New skill", level: 60, note: "" },
                            ],
                          },
                        ],
                      }
                    : c
                )
              }
            >
              Add category
            </AddBtn>
          </div>
        )}

        {/* ── PROJECTS ──────────────────────────────────────────────── */}
        {tab === "projects" && (
          <div className="grid gap-4">
            {content.projects.map((pr, i) => (
              <Card
                key={i}
                title={pr.title || `Project ${i + 1}`}
                onRemove={() =>
                  setContent((c) =>
                    c
                      ? {
                          ...c,
                          projects: c.projects.filter((_, x) => x !== i),
                        }
                      : c
                  )
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <LabeledInput
                    label="Title"
                    value={pr.title}
                    onChange={(v) => setProject(i, { title: v })}
                  />
                  <LabeledInput
                    label="ID"
                    value={pr.id}
                    onChange={(v) => setProject(i, { id: v })}
                    hint="Unique key — likes are stored per ID (lowercase-with-dashes)"
                  />
                  <LabeledInput
                    label="Category (filter chip)"
                    value={pr.category}
                    onChange={(v) => setProject(i, { category: v })}
                  />
                  <LabeledInput
                    label="Emoji"
                    value={pr.emoji}
                    onChange={(v) => setProject(i, { emoji: v })}
                  />
                  <LabeledInput
                    label="Highlight badge"
                    value={pr.highlight}
                    onChange={(v) => setProject(i, { highlight: v })}
                  />
                  <LabeledInput
                    label="Initial likes"
                    type="number"
                    value={pr.initialLikes}
                    onChange={(v) =>
                      setProject(i, {
                        initialLikes: Math.max(0, Math.round(Number(v) || 0)),
                      })
                    }
                  />
                  <LabeledInput
                    label="Gradient (Tailwind classes)"
                    value={pr.gradient}
                    onChange={(v) => setProject(i, { gradient: v })}
                    hint="e.g. from-violet-600 via-fuchsia-500 to-pink-500"
                  />
                  <LabeledInput
                    label="Tech stack (comma separated)"
                    value={pr.tech.join(", ")}
                    onChange={(v) =>
                      setProject(i, {
                        tech: v
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                  <LabeledInput
                    label="Repo URL"
                    value={pr.repoUrl}
                    onChange={(v) => setProject(i, { repoUrl: v })}
                  />
                  <LabeledInput
                    label="Demo URL (optional)"
                    value={pr.demoUrl}
                    onChange={(v) => setProject(i, { demoUrl: v })}
                    hint="If same as repo URL, a single “View code” button shows"
                  />
                </div>
                <LabeledArea
                  label="Tagline"
                  rows={2}
                  value={pr.tagline}
                  onChange={(v) => setProject(i, { tagline: v })}
                />
                <LabeledArea
                  label="Description"
                  rows={4}
                  value={pr.description}
                  onChange={(v) => setProject(i, { description: v })}
                />
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setContent((c) =>
                  c
                    ? {
                        ...c,
                        projects: [
                          ...c.projects,
                          {
                            id: `project-${Date.now()}`,
                            title: "New project",
                            tagline: "",
                            description: "",
                            category: "Web App",
                            emoji: "🚀",
                            gradient:
                              "from-violet-600 via-fuchsia-500 to-pink-500",
                            tech: [],
                            initialLikes: 0,
                            demoUrl: "",
                            repoUrl: "",
                            highlight: "",
                          },
                        ],
                      }
                    : c
                )
              }
            >
              Add project
            </AddBtn>
          </div>
        )}

        {/* ── LEARNING ──────────────────────────────────────────────── */}
        {tab === "learning" && (
          <div className="grid gap-4">
            {content.currentlyLearning.map((l, i) => (
              <Card
                key={i}
                title={l.name || `Item ${i + 1}`}
                onRemove={() =>
                  setContent((c) =>
                    c
                      ? {
                          ...c,
                          currentlyLearning:
                            c.currentlyLearning.filter((_, x) => x !== i),
                        }
                      : c
                  )
                }
              >
                <div className="grid gap-3 sm:grid-cols-[1.6fr_130px_90px]">
                  <LabeledInput
                    label="Skill"
                    value={l.name}
                    onChange={(v) => setLearning(i, { name: v })}
                  />
                  <LabeledInput
                    label="Progress %"
                    type="number"
                    value={l.progress}
                    onChange={(v) =>
                      setLearning(i, {
                        progress: Math.min(
                          100,
                          Math.max(0, Math.round(Number(v) || 0))
                        ),
                      })
                    }
                  />
                  <LabeledInput
                    label="Icon"
                    value={l.icon}
                    onChange={(v) => setLearning(i, { icon: v })}
                  />
                </div>
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setContent((c) =>
                  c
                    ? {
                        ...c,
                        currentlyLearning: [
                          ...c.currentlyLearning,
                          { name: "New skill", progress: 50, icon: "🚀" },
                        ],
                      }
                    : c
                )
              }
            >
              Add learning item
            </AddBtn>
          </div>
        )}

        {/* ── TIMELINE ──────────────────────────────────────────────── */}
        {tab === "timeline" && (
          <div className="grid gap-4">
            {content.timeline.map((t, i) => (
              <Card
                key={i}
                title={t.title || `Milestone ${i + 1}`}
                onRemove={() =>
                  setContent((c) =>
                    c
                      ? { ...c, timeline: c.timeline.filter((_, x) => x !== i) }
                      : c
                  )
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <LabeledInput
                    label="Period (badge)"
                    value={t.period}
                    onChange={(v) => setTimeline(i, { period: v })}
                  />
                  <LabeledInput
                    label="Title"
                    value={t.title}
                    onChange={(v) => setTimeline(i, { title: v })}
                  />
                  <LabeledInput
                    label="Place / provider"
                    value={t.place}
                    onChange={(v) => setTimeline(i, { place: v })}
                  />
                  <LabeledInput
                    label="Tags (comma separated)"
                    value={t.tags.join(", ")}
                    onChange={(v) =>
                      setTimeline(i, {
                        tags: v
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
                <LabeledArea
                  label="Description"
                  rows={3}
                  value={t.description}
                  onChange={(v) => setTimeline(i, { description: v })}
                />
                <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={t.current === true}
                    onChange={(e) =>
                      setTimeline(i, { current: e.target.checked })
                    }
                    className="size-4 accent-fuchsia-500"
                  />
                  Mark as current (pulsing highlight)
                </label>
              </Card>
            ))}
            <AddBtn
              onClick={() =>
                setContent((c) =>
                  c
                    ? {
                        ...c,
                        timeline: [
                          ...c.timeline,
                          {
                            period: "2026",
                            title: "New milestone",
                            place: "",
                            description: "",
                            tags: [],
                          },
                        ],
                      }
                    : c
                )
              }
            >
              Add milestone
            </AddBtn>
          </div>
        )}

        {/* ── MARQUEE ───────────────────────────────────────────────── */}
        {tab === "marquee" && (
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <LabeledArea
              label="Marquee tech list (comma separated)"
              rows={5}
              value={content.marqueeTech.join(", ")}
              onChange={(v) =>
                setContent((c) =>
                  c
                    ? {
                        ...c,
                        marqueeTech: v
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      }
                    : c
                )
              }
              hint="The infinite scrolling chips under the skills tabs"
            />
          </div>
        )}
      </div>
    </div>
  )
}
