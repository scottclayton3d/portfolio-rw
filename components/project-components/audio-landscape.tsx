"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Music, Radio, Headphones } from "lucide-react"

export default function AudioLandscape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frequencyRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate frequency bars
    if (frequencyRef.current) {
      const bars = frequencyRef.current.children
      Array.from(bars).forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: Math.random() * 3 + 0.2,
          duration: 0.3 + Math.random() * 0.4,
          repeat: -1,
          yoyo: true,
          delay: index * 0.05,
          ease: "power2.inOut",
        })
      })
    }

    // Animate wave
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        x: -100,
        duration: 3,
        repeat: -1,
        ease: "none",
      })
    }

    // Container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Sound Design</h3>
          <p className="text-white/60 text-sm">Spatial Audio Experience</p>
        </div>
        <Headphones className="h-5 w-5 text-orange-400" />
      </div>

      {/* Frequency Analyzer */}
      <div ref={frequencyRef} className="flex items-end justify-center h-20 mb-6 space-x-1">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="w-1.5 bg-gradient-to-t from-orange-500 to-red-500 rounded-full"
            style={{ height: `${10 + Math.random() * 70}%` }}
          />
        ))}
      </div>

      {/* Wave Visualization */}
      <div className="h-12 mb-6 overflow-hidden relative bg-black/20 rounded">
        <div ref={waveRef} className="absolute inset-0 flex items-center">
          <svg width="200%" height="100%" viewBox="0 0 400 48" className="text-orange-400">
            <path d="M0,24 Q50,8 100,24 T200,24 T300,24 T400,24" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Music className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">Ambient Layers</span>
        </div>
        <div className="flex items-center space-x-2">
          <Radio className="h-4 w-4 text-orange-400" />
          <span className="text-orange-400 text-sm">Live</span>
        </div>
      </div>
    </div>
  )
}
