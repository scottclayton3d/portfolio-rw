"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"

export default function MinimalHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Animate title
    tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8",
      )
      .fromTo(ctaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section relative min-h-screen flex items-center justify-center px-6 bg-white"
    >
      <div className="text-center max-w-6xl">
        <div ref={titleRef} className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none text-black tracking-tight">
            SESSIONS
          </h1>
        </div>

        <div ref={subtitleRef} className="mb-16">
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Creative developer crafting digital experiences through code, design, and innovation
          </p>
        </div>

        <div ref={ctaRef}>
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300"
          >
            <span className="text-sm font-medium tracking-wide">VIEW WORK</span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
