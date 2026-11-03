import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Projects } from "@/components/portfolio/projects"
import { Learning } from "@/components/portfolio/learning"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"
import { BackToTop } from "@/components/portfolio/back-to-top"
import { CommandPalette } from "@/components/portfolio/command-palette"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
