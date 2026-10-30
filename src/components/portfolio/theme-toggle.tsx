"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark and light mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="group relative grid size-9 place-items-center overflow-hidden rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      <Sun className="size-4 transition-transform duration-300 group-hover:rotate-90 dark:hidden" />
      <Moon className="hidden size-4 transition-transform duration-300 group-hover:-rotate-12 dark:block" />
    </button>
  )
}
