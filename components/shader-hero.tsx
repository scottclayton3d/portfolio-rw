"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import EnhancedWebGLTextShader from "./enhanced-shader-text"

export default function ShaderHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const marqueeText = "CREATIVE DEVELOPER • DIGITAL ARTIST • MUSIC PRODUCER • 3D DESIGNER • "

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline({ delay: 3 })

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
    tl.fromTo(ctaRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" ref={heroRef} className="section relative min-h-screen bg-black overflow-hidden">
      {/* Main Shader Text with Enhanced Edge Distortion */}
      <div className="absolute inset-0 flex items-center justify-center">
        <EnhancedWebGLTextShader
          text="SESSIONS"
          fontSize={4}
          colorScheme="vibrant"
          edgeDistortion={0.25}
          flowIntensity={0.15}
          className="w-full h-full"
        />
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
  )
}
