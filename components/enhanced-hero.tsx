"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import SVGTextMask from "./svg-text-mask"
import SectionTransitions from "./section-transitions"

export default function EnhancedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const heroImages = [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ]

  const marqueeText = "CREATIVE DEVELOPER • DIGITAL ARTIST • MUSIC PRODUCER • 3D DESIGNER • "

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline({ delay: 3 })

    // Title animation with stagger
    tl.fromTo(
      titleRef.current,
      { scale: 0.8, opacity: 0, rotationX: 45 },
      { scale: 1, opacity: 1, rotationX: 0, duration: 1.5, ease: "power3.out" },
    )

    // Marquee animation
    if (marqueeRef.current) {
      const marqueeWidth = marqueeRef.current.scrollWidth
      gsap.to(marqueeRef.current, {
        x: -marqueeWidth / 2,
        duration: 30,
        repeat: -1,
        ease: "none",
      })
    }

    // CTA animation
    tl.fromTo(ctaRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")

    setIsLoaded(true)
  }, [])

  const scrollToProjects = () => {
    // Create transition effect
    const transitionElement = document.createElement("div")
    transitionElement.className = "fixed inset-0 z-50 bg-black transform translate-y-full"
    document.body.appendChild(transitionElement)

    gsap
      .timeline()
      .to(transitionElement, {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      })
      .call(() => {
        const element = document.getElementById("projects")
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      })
      .to(transitionElement, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.5,
        onComplete: () => {
          document.body.removeChild(transitionElement)
        },
      })
  }

  return (
    <SectionTransitions animationType="reveal">
      <section id="hero" ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
        {/* Main Text Mask */}
        <div ref={titleRef} className="absolute inset-0">
          <SVGTextMask text="SESSIONS" images={heroImages} className="w-full h-full" fontSize="12rem" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-bounce" />
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-white/10 rounded-full animate-ping" />
        </div>

        {/* Scrolling Marquee */}
        <div className="absolute bottom-32 left-0 w-full overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-white/20 text-2xl font-bold tracking-wider"
            style={{ width: "200%" }}
          >
            {marqueeText.repeat(4)}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div ref={ctaRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToProjects}
            className="group relative overflow-hidden px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/20"
          >
            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="relative flex items-center space-x-2 text-white">
              <span className="text-sm font-medium tracking-wide">EXPLORE WORK</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent">
            <div className="w-full h-4 bg-white/80 animate-pulse" />
          </div>
        </div>
      </section>
    </SectionTransitions>
  )
}
