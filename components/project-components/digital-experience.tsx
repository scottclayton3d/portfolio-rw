"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function DigitalExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate waveform bars
    if (waveformRef.current) {
      const bars = waveformRef.current.children
      Array.from(bars).forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: Math.random() * 2 + 0.5,
          duration: 0.5 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
          ease: "power2.inOut",
        })
      })
    }

    // Container entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Audio Visualizer</h3>
          <p className="text-white/60 text-sm">Interactive Web Experience</p>
        </div>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>

      {/* Waveform Visualization */}
      <div ref={waveformRef} className="flex items-end justify-center h-24 mb-6 space-x-1">
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <Button size="icon" className="bg-white/10 hover:bg-white/20 border border-white/20">
            <Play className="h-4 w-4 text-white" />
          </Button>
          <Button size="icon" className="bg-white/10 hover:bg-white/20 border border-white/20">
            <Pause className="h-4 w-4 text-white" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="h-4 w-4 text-white/60" />
          <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
        </div>

        <div className="text-center">
          <div className="text-white/80 text-sm">Now Playing</div>
          <div className="text-white font-medium">Cosmic Frequencies</div>
        </div>
      </div>
    </div>
  )
}
