"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AbstractHero from "@/components/abstract-hero"
import HorizontalProjects from "@/components/horizontal-projects"
import MinimalAbout from "@/components/minimal-about"
import MinimalContact from "@/components/minimal-contact"
import FloatingNavigation from "@/components/floating-navigation"
import LoadingScreen from "@/components/loading-screen"
import WorkSection from "@/components/work-section"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const sections = containerRef.current.querySelectorAll("section")

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentSection(index),
          onEnterBack: () => setCurrentSection(index),
        })
      })

      // Page transition effects
      ScrollTrigger.batch("section", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: "power3.out" },
          )
        },
        onLeave: (elements) => {
          gsap.to(elements, { opacity: 0.8, duration: 0.5, ease: "power2.inOut" })
        },
        onEnterBack: (elements) => {
          gsap.to(elements, { opacity: 1, duration: 0.5, ease: "power2.inOut" })
        },
      })
    }
  }, [isLoading])

  const handleSectionChange = (sectionIndex: number) => {
    const sections = ["hero", "projects", "about", "contact"]
    const element = document.getElementById(sections[sectionIndex])
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToNextSection = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative">
      <FloatingNavigation currentSection={currentSection} onSectionChange={handleSectionChange} />

      <div ref={containerRef} className="main-content">
        <AbstractHero onScrollToNext={scrollToNextSection} />
        <HorizontalProjects />
        <WorkSection />
        <MinimalAbout />
        <MinimalContact />
      </div>
    </div>
  )
}
