"use client"

import { ArrowUp, Code2, Command, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { navLinks } from "@/lib/portfolio-data"
import { useSiteContent } from "./content-provider"
import { openCommandPalette } from "./command-palette"

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  leetcode: Code2,
}

export function Footer() {
  const { profile } = useSiteContent()
  const jump = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
              aria-label="Back to top"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-xs font-bold text-white">
                {profile.initials}
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] font-semibold">
                {profile.name}
                <span className="text-gradient">.dev</span>
              </span>
            </button>
            <p className="text-xs text-muted-foreground">
              Designed &amp; built with Next.js, Tailwind CSS &amp; Framer Motion.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => jump(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons]
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Command className="size-3" /> Press
              <kbd className="font-[family-name:var(--font-mono)] font-semibold">
                Ctrl K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              Back to top <ArrowUp className="size-3.5" />
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 transition-colors hover:border-primary/50 hover:text-primary"
            >
              Site admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
