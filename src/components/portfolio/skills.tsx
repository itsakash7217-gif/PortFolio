"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSiteContent } from "./content-provider"
import { SectionHeading } from "./section-heading"

function SkillBar({
  name,
  level,
  note,
  delay,
}: {
  name: string
  level: number
  note: string
  delay: number
}) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{name}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            — {note}
          </span>
        </div>
        <span className="font-[family-name:var(--font-mono)] text-xs text-primary">
          {level}%
        </span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
        >
          <span className="absolute inset-0 bg-white/20 [mask-image:linear-gradient(90deg,transparent,black)]" />
        </motion.div>
      </div>
    </div>
  )
}

export function Skills() {
  const { skills, marqueeTech } = useSiteContent()
  const [tab, setTab] = useState<string | null>(null)
  const activeTab = tab ?? skills[0]?.category ?? ""

  return (
    <section id="skills" className="relative scroll-mt-24 px-4 py-24">
      {/* soft backdrop tint */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="My toolbox"
          title="Skills & technologies"
          description="The stack I reach for daily — depth where it matters, breadth where it helps."
        />

        <Tabs value={activeTab} onValueChange={(v) => setTab(v)}>
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
            {skills.map((group) => (
              <TabsTrigger key={group.category} value={group.category}>
                {group.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {skills.map((group) => (
            <TabsContent key={group.category} value={group.category}>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                {group.blurb}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 md:grid-cols-2 md:gap-x-10"
                >
                  {group.items.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* Tech marquee */}
        <div className="marquee-paused relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">
            {[...marqueeTech, ...marqueeTech].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
