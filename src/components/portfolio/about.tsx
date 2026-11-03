"use client"

import { motion } from "framer-motion"
import { Coffee, Compass, Globe, Mail, Rocket, Wrench } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const facts = [
  { icon: Globe, label: "Based in", value: profile.location },
  { icon: Mail, label: "Email", value: profile.email },
  { icon: Coffee, label: "Fuel", value: "Chai & curiosity" },
  { icon: Compass, label: "Focus", value: "AI, DSA & full-stack" },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About me"
          title="Turning ideas into working software"
          description="A quick snapshot of who I am, how I work and what drives me."
        />

        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-5"
          >
            {profile.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {i === 0 ? (
                  <span className="float-left mr-2 font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-[0.85] text-gradient">
                    {paragraph.charAt(0)}
                  </span>
                ) : null}
                {i === 0 ? paragraph.slice(1) : paragraph}
              </p>
            ))}

            <div className="grid gap-3 sm:grid-cols-2">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition-colors hover:border-primary/40"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <fact.icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="truncate text-sm font-semibold">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Value cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: Rocket,
                title: "Ship fast, ship right",
                text: "Small releases, tight feedback loops, measurable outcomes — momentum without tech debt.",
              },
              {
                icon: Wrench,
                title: "Pragmatic engineering",
                text: "The simplest architecture that survives contact with real users. Boring infra, exciting product.",
              },
              {
                icon: Compass,
                title: "Design-minded",
                text: "Prototypes in code, pixels with intent. I believe motion and micro-detail make software feel alive.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md">
                    <card.icon className="size-5" />
                  </span>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
