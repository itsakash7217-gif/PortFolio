"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { SiteContent } from "@/lib/portfolio-data"

const SiteContentContext = createContext<SiteContent | null>(null)

/**
 * Holds the live portfolio content (defaults merged with any edits
 * saved from the /admin panel). Provided once in src/app/page.tsx.
 */
export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent
  children: ReactNode
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteContentContext)
  if (!ctx) {
    throw new Error("useSiteContent must be used inside <SiteContentProvider>")
  }
  return ctx
}
