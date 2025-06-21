"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Eye, Headphones, Gamepad2, Zap } from "lucide-react"

export default function VirtualReality() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate orbital elements
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      })
    }

    // Animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
          ease: "power2.inOut",
        })
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
      className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">VR Experience</h3>
          <p className="text-white/60 text-sm">Immersive Reality</p>
        </div>
        <Eye className="h-5 w-5 text-cyan-400" />
      </div>

      {/* VR Visualization */}
      <div className="relative h-32 mb-6 flex items-center justify-center">
        <div ref={orbitRef} className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-8 border border-cyan-500/30 rounded-full" />
          <div className="absolute -inset-12 border border-blue-500/20 rounded-full" />
        </div>

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="absolute top-12 right-12 w-1 h-1 bg-blue-400 rounded-full" />
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full" />
          <div className="absolute bottom-4 right-8 w-1 h-1 bg-cyan-300 rounded-full" />
        </div>
      </div>

      {/* VR Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Headphones className="h-4 w-4 text-cyan-400" />
          <span className="text-white/80 text-sm">Spatial Audio</span>
        </div>
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-4 w-4 text-blue-400" />
          <span className="text-white/80 text-sm">Hand Tracking</span>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 font-bold">120Hz</div>
          <div className="text-white/60 text-xs">Refresh Rate</div>
        </div>
        <div className="text-center">
          <div className="text-blue-400 font-bold">6DOF</div>
          <div className="text-white/60 text-xs">Movement</div>
        </div>
      </div>
    </div>
  )
}
