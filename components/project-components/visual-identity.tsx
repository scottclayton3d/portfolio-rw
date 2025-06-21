"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Layers, Palette, Zap } from "lucide-react"

export default function VisualIdentity() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const colorsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate logo rotation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      })
    }

    // Animate color swatches
    if (colorsRef.current) {
      const swatches = colorsRef.current.children
      Array.from(swatches).forEach((swatch, index) => {
        gsap.to(swatch, {
          scale: 1.1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "power2.inOut",
        })
      })
    }

    // Container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Brand System</h3>
          <p className="text-white/60 text-sm">Visual Identity Design</p>
        </div>
        <Palette className="h-5 w-5 text-blue-400" />
      </div>

      {/* Logo Animation */}
      <div className="flex justify-center mb-6">
        <div ref={logoRef} className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-sm" />
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">Color Palette</span>
        </div>

        <div ref={colorsRef} className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
          <div className="w-8 h-8 bg-purple-500 rounded-full" />
          <div className="w-8 h-8 bg-pink-500 rounded-full" />
          <div className="w-8 h-8 bg-cyan-500 rounded-full" />
        </div>

        <div className="space-y-2">
          <div className="text-white/80 text-sm">Typography</div>
          <div className="text-white font-bold text-lg">Geist Bold</div>
          <div className="text-white/60 text-sm">Geist Regular</div>
        </div>
      </div>
    </div>
  )
}
