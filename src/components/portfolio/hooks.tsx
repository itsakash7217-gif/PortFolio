"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

/** Cycles through words with a type → pause → delete → next loop. */
export function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let delay = deleting ? 38 : 85

    if (!deleting && text === word) {
      delay = 1800
    } else if (deleting && text === "") {
      delay = 350
    }

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === "") {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(t)
  }, [text, deleting, wordIndex, words])

  return text
}

/** Counts from 0 → target once the element scrolls into view. */
export function CountUp({
  target,
  suffix = "",
  duration = 1600,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}
