"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Film, Play, Layers, Sparkles } from "lucide-react"

export default function MotionGraphics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate timeline
    if (timelineRef.current) {
      gsap.to(timelineRef.current.querySelector(".playhead"), {
        x: 200,
        duration: 3,
        repeat: -1,
        ease: "none",
      })
    }

    // Animate layers
    if (layersRef.current) {
      const layers = layersRef.current.children
      Array.from(layers).forEach((layer, index) => {
        gsap.to(layer, {
          x: Math.sin(index) * 10,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
      })
    }

    // Container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-violet-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Motion Design</h3>
          <p className="text-white/60 text-sm">Animation Studio</p>
        </div>
        <Film className="h-5 w-5 text-violet-400" />
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative h-8 mb-6 bg-black/40 rounded overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-500/20 to-purple-500/20" />
        <div className="playhead absolute top-0 left-0 w-0.5 h-full bg-violet-400" />
      </div>

      {/* Layers */}
      <div ref={layersRef} className="space-y-2 mb-6">
        <div className="flex items-center space-x-2 p-2 bg-violet-500/10 rounded">
          <Layers className="h-3 w-3 text-violet-400" />
          <span className="text-white/80 text-sm">Text Animation</span>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-purple-500/10 rounded">
          <Sparkles className="h-3 w-3 text-purple-400" />
          <span className="text-white/80 text-sm">Particle Effects</span>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-pink-500/10 rounded">
          <Play className="h-3 w-3 text-pink-400" />
          <span className="text-white/80 text-sm">Transitions</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-violet-400 font-bold text-lg">60fps</div>
          <div className="text-white/60 text-xs">Frame Rate</div>
        </div>
        <div>
          <div className="text-purple-400 font-bold text-lg">4K</div>
          <div className="text-white/60 text-xs">Resolution</div>
        </div>
      </div>
    </div>
  )
}
