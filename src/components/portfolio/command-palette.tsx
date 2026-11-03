"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Code2,
  Copy,
  Download,
  Github,
  Linkedin,
  Moon,
  Settings2,
  Sun,
  Twitter,
  User,
  Braces,
  FolderGit2,
  GraduationCap,
  Mail,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useSiteContent } from "./content-provider"

const OPEN_EVENT = "portfolio:open-command-palette"

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

const linkIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  leetcode: Code2,
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { profile } = useSiteContent()
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      document.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  const go = useCallback((href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const copyEmail = useCallback(() => {
    setOpen(false)
    navigator.clipboard
      .writeText(profile.email)
      .then(() => toast.success("Email copied to clipboard"))
      .catch(() => toast.error("Could not copy email"))
  }, [profile.email])

  const toggleTheme = useCallback(() => {
    setOpen(false)
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  const run = useCallback(
    (fn: () => void) => {
      return () => {
        setOpen(false)
        fn()
      }
    },
    []
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("#about")}>
            <User className="mr-2 size-4" /> About me
          </CommandItem>
          <CommandItem onSelect={() => go("#skills")}>
            <Braces className="mr-2 size-4" /> Skills
          </CommandItem>
          <CommandItem onSelect={() => go("#projects")}>
            <FolderGit2 className="mr-2 size-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={() => go("#learning")}>
            <GraduationCap className="mr-2 size-4" /> Learning journey
          </CommandItem>
          <CommandItem onSelect={() => go("#contact")}>
            <MessageSquare className="mr-2 size-4" /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={run(toggleTheme)}>
            {resolvedTheme === "dark" ? (
              <Sun className="mr-2 size-4" />
            ) : (
              <Moon className="mr-2 size-4" />
            )}
            Toggle {resolvedTheme === "dark" ? "light" : "dark"} mode
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              router.push(profile.resumeUrl)
            }}
          >
            <Download className="mr-2 size-4" /> Download résumé (PDF)
          </CommandItem>
          <CommandItem onSelect={run(copyEmail)}>
            <Copy className="mr-2 size-4" /> Copy email address
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              router.push("/admin")
            }}
          >
            <Settings2 className="mr-2 size-4" /> Open admin panel (edit content)
            <ArrowRight className="ml-auto size-3 opacity-50" />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          {profile.socials.map((s) => {
            const Icon = linkIcons[s.icon] ?? Code2
            return (
              <CommandItem
                key={s.label}
                onSelect={() => {
                  setOpen(false)
                  window.open(s.url, "_blank", "noopener,noreferrer")
                }}
              >
                <Icon className="mr-2 size-4" />
                {s.label}
                <ArrowRight className="ml-auto size-3 opacity-50" />
              </CommandItem>
            )
          })}
          <CommandItem
            onSelect={() => {
              setOpen(false)
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Mail className="mr-2 size-4" /> Write me a message
            <ArrowRight className="ml-auto size-3 opacity-50" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
