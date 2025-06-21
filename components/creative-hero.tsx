"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import SVGTextMask from "./svg-text-mask"

export default function CreativeHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const heroImages = [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ]

  const marqueeText = "CREATIVE DEVELOPER • DIGITAL ARTIST • MUSIC PRODUCER • 3D DESIGNER • "

  useEffect(() => {
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
    gsap.fromTo(ctaRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power2.out" })
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" ref={heroRef} className="section relative min-h-screen bg-black overflow-hidden">
      {/* Main Text Mask */}
      <div className="absolute inset-0">
        <SVGTextMask text="SESSIONS" images={heroImages} className="w-full h-full" fontSize="12rem" />
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

      {/* CTA */}
      <div ref={ctaRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToProjects}
          className="group flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
        >
          <span className="text-sm font-medium tracking-wide">EXPLORE WORK</span>
          <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  )
}
