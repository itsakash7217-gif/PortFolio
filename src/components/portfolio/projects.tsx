"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { ExternalLink, Github, Heart, Zap } from "lucide-react"
import { toast } from "sonner"
import {
  projects,
  type ProjectCategory,
} from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "Web App",
  "AI / ML",
  "Data & Analytics",
  "Deep Learning",
]

const LIKED_KEY = "portfolio.likedProjects"

function readLiked(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(window.localStorage.getItem(LIKED_KEY) ?? "[]")
  } catch {
    return []
  }
}

function ProjectCard({
  project,
  likes,
  liked,
  onLike,
  index,
}: {
  project: (typeof projects)[number]
  likes: number
  liked: boolean
  onLike: (id: string) => void
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), spring)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), spring)
  const [burst, setBurst] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const handleLike = () => {
    if (!liked) setBurst((b) => b + 1)
    onLike(project.id)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition-colors hover:border-primary/40"
      >
        {/* Cover */}
        <div
          className={cn(
            "relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br",
            project.gradient
          )}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
            aria-hidden="true"
          />
          <span
            className="text-5xl drop-shadow-lg transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6"
            role="img"
            aria-label={`${project.title} icon`}
          >
            {project.emoji}
          </span>
          <span className="absolute left-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {project.category}
          </span>
          <span className="absolute right-3 top-3 inline-flex max-w-[55%] items-center gap-1 truncate rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
            <Zap className="size-3 shrink-0 fill-current" />
            {project.highlight}
          </span>
          <span className="shine-wrap absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-primary">{project.tagline}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-secondary-foreground"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <button
              type="button"
              onClick={handleLike}
              aria-pressed={liked}
              aria-label={
                liked
                  ? `Liked — ${likes} likes for ${project.title}`
                  : `Like ${project.title}`
              }
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                liked
                  ? "border-rose-500/50 bg-rose-500/10 text-rose-500"
                  : "border-border text-muted-foreground hover:border-rose-400/60 hover:text-rose-500"
              )}
            >
              <motion.span
                key={burst}
                initial={burst ? { scale: 0.4 } : false}
                animate={{ scale: burst ? [0.4, 1.5, 1] : 1 }}
                transition={{ duration: 0.35 }}
                className="grid place-items-center"
              >
                <Heart className={cn("size-4", liked && "fill-current")} />
              </motion.span>
              <AnimatePresence>
                <motion.span
                  key={likes}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="tabular-nums"
                >
                  {likes}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-1.5">
              {project.demoUrl === project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Github className="size-3.5" />
                  View code
                </a>
              ) : (
                <>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Github className="size-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Live demo
                    <ExternalLink className="size-3.5" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setLikedIds(new Set(readLiked()))
    fetch("/api/likes")
      .then((r) => r.json())
      .then((data) => setLikes(data.likes ?? {}))
      .catch(() => setLikes({}))
  }, [])

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter)

  const handleLike = async (projectId: string) => {
    if (likedIds.has(projectId)) {
      toast.info("You already liked this one 💜")
      return
    }
    // optimistic update
    setLikes((prev) => ({ ...prev, [projectId]: (prev[projectId] ?? 0) + 1 }))
    const next = new Set(likedIds).add(projectId)
    setLikedIds(next)
    window.localStorage.setItem(LIKED_KEY, JSON.stringify([...next]))
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      })
      const data = await res.json()
      if (data.ok) {
        setLikes((prev) => ({ ...prev, [projectId]: data.count }))
      } else {
        throw new Error(data.error)
      }
    } catch {
      toast.error("Could not save your like — check your connection.")
    }
  }

  return (
    <section id="projects" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects I'm proud of"
          description="Products, experiments and open source — each one taught me something new. Tap the heart to vote for a favorite."
        />

        {/* Filters */}
        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filters.map((f) => {
            const isActive = filter === f
            const count =
              f === "All"
                ? projects.length
                : projects.filter((p) => p.category === f).length
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-transparent text-white"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-md shadow-fuchsia-500/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {f}
                <span
                  className={cn(
                    "ml-1.5 rounded-full px-1.5 text-[11px]",
                    isActive ? "bg-white/20" : "bg-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                likes={likes[project.id] ?? project.initialLikes}
                liked={likedIds.has(project.id)}
                onLike={handleLike}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
