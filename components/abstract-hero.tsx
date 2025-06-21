"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowUpRight, RotateCcw, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AbstractHeroProps {
  onScrollToNext: () => void
}

export default function AbstractHero({ onScrollToNext }: AbstractHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Animate gradient blobs
    if (gradientRef.current) {
      const blobs = gradientRef.current.children
      Array.from(blobs).forEach((blob, index) => {
        gsap.fromTo(
          blob,
          {
            scale: 0,
            opacity: 0,
            rotation: Math.random() * 360,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: Math.random() * 360 + 180,
            duration: 2 + index * 0.5,
            delay: index * 0.3,
            ease: "power3.out",
          },
        )

        // Continuous floating animation
        gsap.to(blob, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          rotation: `+=${Math.random() * 180 - 90}`,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
      })
    }

    // Animate text elements
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1, ease: "power3.out" },
      )
    }

    // Animate buttons
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, delay: 2, ease: "back.out(1.7)" },
      )
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Animated Gradient Blobs */}
      <div ref={gradientRef} className="absolute inset-0 pointer-events-none">
        {/* Large purple blob */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.4) 40%, transparent 70%)",
            filter: "blur(40px)",
            top: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />

        {/* Pink blob */}
        <div
          className="absolute w-80 h-80 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.9) 0%, rgba(236, 72, 153, 0.5) 40%, transparent 70%)",
            filter: "blur(35px)",
            top: "40%",
            right: "15%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.025}px)`,
          }}
        />

        {/* White glow blob */}
        <div
          className="absolute w-64 h-64 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 40%, transparent 70%)",
            filter: "blur(30px)",
            bottom: "30%",
            left: "20%",
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.02}px)`,
          }}
        />

        {/* Red accent blob */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(239, 68, 68, 0.3) 40%, transparent 70%)",
            filter: "blur(45px)",
            bottom: "10%",
            right: "25%",
            transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * 0.03}px)`,
          }}
        />

        {/* Additional smaller blobs */}
        <div
          className="absolute w-48 h-48 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 80%)",
            filter: "blur(25px)",
            top: "60%",
            left: "50%",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.015}px)`,
          }}
        />
      </div>

      {/* Scattered Text Elements */}
      <div ref={textRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 text-white/30 text-xs font-mono">01</div>
        <div className="absolute top-32 left-20 text-white/20 text-xs">CREATIVE DEVELOPER</div>
        <div className="absolute top-40 left-12 text-white/15 text-xs">DIGITAL EXPERIENCES</div>
        <div className="absolute bottom-40 left-24 text-white/25 text-xs font-mono">17</div>
        <div className="absolute bottom-32 left-16 text-white/20 text-xs">INTERACTIVE DESIGN</div>
        <div className="absolute top-24 right-32 text-white/30 text-xs">WEBGL • THREE.JS</div>
        <div className="absolute top-48 right-24 text-white/20 text-xs">MOTION GRAPHICS</div>
        <div className="absolute bottom-48 right-40 text-white/25 text-xs">SOUND DESIGN</div>
        <div className="absolute bottom-24 right-16 text-white/20 text-xs font-mono">2024-2025</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white leading-none tracking-tight">
            SESSIONS
          </h1>
        </div>

        <div className="text-lg md:text-xl text-white/60 max-w-md mx-auto mb-12">
          Creative developer crafting immersive digital experiences through code and design
        </div>

        <button
          onClick={onScrollToNext}
          className="group flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 mx-auto"
        >
          <span className="text-sm font-medium tracking-wide">EXPLORE WORK</span>
          <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Floating Action Buttons */}
      <div ref={buttonsRef} className="absolute bottom-8 right-8 flex flex-col space-y-4">
        <Button
          size="icon"
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-2xl group"
        >
          <ArrowUpRight className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>

        <Button
          size="icon"
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-2xl group"
        >
          <RotateCcw className="h-5 w-5 text-white group-hover:rotate-180 transition-transform duration-500" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent">
          <div className="w-full h-4 bg-white/80 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
