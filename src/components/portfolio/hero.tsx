"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Copy,
  Download,
  FolderGit2,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Twitter,
} from "lucide-react"
import { toast } from "sonner"
import { profile } from "@/lib/portfolio-data"
import { CountUp, useTypewriter } from "./hooks"

const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter }

function copyEmail() {
  navigator.clipboard
    .writeText(profile.email)
    .then(() => toast.success("Email copied — talk soon!"))
    .catch(() => toast.error("Could not copy email"))
}

export function Hero() {
  const typed = useTypewriter(profile.roles)

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28"
    >
      {/* ── Animated backdrop ─────────────────────────────── */}
      <div className="grid-bg absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_78%)]"
        aria-hidden="true"
      />
      <div
        className="animate-blob absolute -left-32 top-24 -z-10 size-[26rem] rounded-full bg-violet-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-blob absolute -right-24 top-1/3 -z-10 size-[22rem] rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:-6s]"
        aria-hidden="true"
      />
      <div
        className="animate-blob absolute bottom-8 left-1/3 -z-10 size-[18rem] rounded-full bg-amber-400/15 blur-3xl [animation-delay:-11s]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Left: intro ─────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to internships & opportunities
          </motion.div>

          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <MapPin className="size-3.5" /> {profile.location}
              <span className="text-border">|</span>
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex h-9 items-center font-[family-name:var(--font-mono)] text-xl text-muted-foreground sm:text-2xl"
            >
              <span className="mr-2 text-primary">&gt;</span>
              <span>{typed}</span>
              <span className="animate-caret ml-0.5 inline-block h-6 w-[2px] bg-primary" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.33 }}
            className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="shine-wrap group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-[1.04]"
            >
              <FolderGit2 className="size-4" />
              View my projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={profile.resumeUrl}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Download className="size-4" />
              Download CV
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="grid size-11 place-items-center rounded-full border border-border bg-card/70 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Copy className="size-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons]
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* ── Right: floating code card ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative hidden lg:block"
        >
          <div className="animate-float-slow">
            <div className="glow-ring rounded-2xl border border-border bg-card/80 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-400/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
                  akash.ts — profile
                </span>
              </div>
              <pre className="overflow-hidden p-5 font-[family-name:var(--font-mono)] text-[13px] leading-6">
                <code>
                  <span className="text-fuchsia-500">const</span>{" "}
                  <span className="text-amber-500">developer</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-zinc-400">{"{"}</span>
                  {"\n  "}
                  <span className="text-violet-400">name</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-emerald-500">&quot;Akash Kushwaha&quot;</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n  "}
                  <span className="text-violet-400">stack</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-zinc-400">[</span>
                  <span className="text-emerald-500">&quot;Java&quot;</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-emerald-500">&quot;TS&quot;</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-emerald-500">&quot;React&quot;</span>
                  <span className="text-zinc-400">]</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n  "}
                  <span className="text-violet-400">focus</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-emerald-500">&quot;AI · DSA · full-stack&quot;</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n  "}
                  <span className="text-violet-400">coffee</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-rose-400">Infinity</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n  "}
                  <span className="text-fuchsia-500">ship</span>
                  <span className="text-zinc-400">: ()</span>{" "}
                  <span className="text-fuchsia-500">=&gt;</span>{" "}
                  <span className="text-amber-500">deploy</span>
                  <span className="text-zinc-400">(🚀)</span>
                  <span className="text-muted-foreground">,</span>
                  {"\n"}
                  <span className="text-zinc-400">{"}"}</span>
                  <span className="text-muted-foreground">;</span>
                </code>
              </pre>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="glass absolute -bottom-7 -left-7 flex items-center gap-3 rounded-2xl border border-border px-4 py-3 shadow-xl"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
              <p className="text-sm font-semibold">MERN stack &amp; Generative AI</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats strip ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl border border-border px-4 py-5 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold sm:text-3xl">
              <span className="text-gradient">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.button
        type="button"
        aria-label="Scroll down to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-5 hidden flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-current"
          />
        </span>
      </motion.button>
    </section>
  )
}
