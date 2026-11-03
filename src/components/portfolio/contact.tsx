"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react"
import { toast } from "sonner"
import { profile } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter }

type Status = "idle" | "sending" | "sent"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const copyEmail = () => {
    navigator.clipboard
      .writeText(profile.email)
      .then(() => toast.success("Email copied to clipboard"))
      .catch(() => toast.error("Could not copy email"))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    }

    // client-side sanity checks (server re-validates too)
    if (payload.name.length < 2) return setError("Please tell me your name.")
    if (!/^\S+@\S+\.\S+$/.test(payload.email))
      return setError("That email doesn't look right.")
    if (payload.message.length < 10)
      return setError("A few more words, please — 10 characters minimum.")

    setError(null)
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Failed to send")
      setStatus("sent")
      form.reset()
      toast.success("Message sent! I'll get back to you soon 🚀")
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      setStatus("idle")
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      )
      toast.error("Message failed to send. Please try again.")
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Let's talk"
          title="Get in touch"
          description="Have a project in mind, a question, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                Contact details
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="truncate text-sm font-semibold">
                      {profile.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold">{profile.location}</p>
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                I usually reply within 24 hours. For quick questions, reaching
                out on socials works great too.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {profile.socials.map((s, i) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons]
                return (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-4 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-5" />
                    <span className="text-xs font-medium">{s.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.form
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-6"
            aria-label="Contact form"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 rounded-xl border border-input bg-background/60 px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  className="h-11 rounded-xl border border-input bg-background/60 px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline and budget…"
                className="resize-none rounded-xl border border-input bg-background/60 px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending…
                </>
              ) : status === "sent" ? (
                <>✓ Sent — thank you!</>
              ) : (
                <>
                  <Send className="size-4" /> Send message
                </>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Messages are stored securely and never shared.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
