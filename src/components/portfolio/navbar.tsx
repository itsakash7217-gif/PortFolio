"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Command, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinks, profile, type SectionId } from "@/lib/portfolio-data"
import { ThemeToggle } from "./theme-toggle"
import { openCommandPalette } from "./command-palette"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      const ids: SectionId[] = ["about", "skills", "projects", "learning", "contact"]
      let current: SectionId | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 160) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const jump = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6"
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "glass border-border shadow-lg shadow-black/5"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="group flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white shadow-md transition-transform group-hover:scale-105">
            AC
          </span>
          <span className="hidden font-[family-name:var(--font-space-grotesk)] text-sm font-semibold sm:block">
            {profile.name}
            <span className="text-gradient">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1) as SectionId
            const isActive = active === id
            return (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => jump(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette (Ctrl+K)"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary sm:flex"
          >
            <Command className="size-3.5" />
            K
          </button>
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            download="Alex-Carter-Resume.pdf"
            className="hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/25 transition-transform hover:scale-105 md:block"
          >
            Résumé
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border bg-card/60 md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-border p-2 shadow-xl md:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => jump(link.href)}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-foreground/90 transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="mt-1 border-t border-border pt-2">
                  <a
                    href={profile.resumeUrl}
                    download="Alex-Carter-Resume.pdf"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Download Résumé
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
