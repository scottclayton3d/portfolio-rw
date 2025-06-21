"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    tl.fromTo(
      titleRef.current?.children || [],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")

    // Floating animation for CTA
    gsap.to(ctaRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <section id="hero" ref={heroRef} className="section relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-6xl">
        <div ref={titleRef} className="mb-8">
          <div className="text-7xl md:text-9xl font-bold mb-4">
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              CREATIVE
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DEVELOPER
            </span>
          </div>
        </div>

        <div ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Crafting immersive digital experiences through web development, 3D art, virtual instruments, and electronic
          music production
        </div>

        <div ref={ctaRef} className="flex justify-center">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors duration-300"
          >
            <span className="text-lg">Explore My Work</span>
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
