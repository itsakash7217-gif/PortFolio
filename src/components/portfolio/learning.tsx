"use client"

import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Sparkles } from "lucide-react"
import { currentlyLearning, timeline } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

export function Learning() {
  return (
    <section id="learning" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Always leveling up"
          title="The learning journey"
          description="Career milestones and the stops along the way — plus what's on the roadmap right now."
        />

        {/* Currently learning */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {currentlyLearning.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  <Sparkles className="size-3" /> in progress
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.name} progress`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                />
              </div>
              <p className="mt-1.5 text-right font-[family-name:var(--font-mono)] text-xs text-primary">
                {item.progress}%
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div
            className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-1/2"
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <li key={`${item.period}-${item.title}`} className="relative">
                  {/* dot */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className={cn(
                      "absolute left-[19px] top-6 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 border-background sm:left-1/2",
                      item.current ? "bg-fuchsia-500" : "bg-primary"
                    )}
                  >
                    {item.current && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-fuchsia-500 opacity-60" />
                    )}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, y: 24, x: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={cn(
                      "ml-12 sm:ml-0 sm:w-[calc(50%-3rem)]",
                      isLeft ? "sm:mr-auto" : "sm:ml-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl border bg-card/70 p-5 transition-colors hover:border-primary/40",
                        item.current ? "border-primary/40 glow-ring" : "border-border"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-xs font-semibold text-primary">
                          {item.period}
                        </span>
                        {item.current && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/15 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-500">
                            <span className="size-1.5 rounded-full bg-fuchsia-500" />
                            current
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-base font-bold">
                        {item.title}
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                        {item.title.includes("B.Sc") ? (
                          <GraduationCap className="size-3.5" />
                        ) : (
                          <BookOpen className="size-3.5" />
                        )}
                        {item.place}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-secondary-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
