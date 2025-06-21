"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Brain, Cpu, Zap, Activity } from "lucide-react"

export default function AIIntegration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate neural network
    if (networkRef.current) {
      const nodes = networkRef.current.children
      Array.from(nodes).forEach((node, index) => {
        gsap.to(node, {
          scale: 1.2,
          duration: 1 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "power2.inOut",
        })
      })
    }

    // Animate data flow
    if (dataRef.current) {
      gsap.to(dataRef.current, {
        x: 100,
        duration: 2,
        repeat: -1,
        ease: "power2.inOut",
      })
    }

    // Container entrance
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
      className="w-full h-full bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">AI Systems</h3>
          <p className="text-white/60 text-sm">Machine Learning</p>
        </div>
        <Brain className="h-5 w-5 text-emerald-400" />
      </div>

      {/* Neural Network Visualization */}
      <div className="relative h-24 mb-6 overflow-hidden">
        <div ref={networkRef} className="flex items-center justify-between h-full">
          <div className="w-3 h-3 bg-emerald-400 rounded-full" />
          <div className="w-2 h-2 bg-teal-400 rounded-full" />
          <div className="w-4 h-4 bg-emerald-500 rounded-full" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="w-3 h-3 bg-teal-500 rounded-full" />
        </div>

        {/* Data Flow */}
        <div ref={dataRef} className="absolute top-1/2 left-0 w-2 h-0.5 bg-emerald-400 transform -translate-y-1/2" />
      </div>

      {/* AI Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="text-white/80 text-sm">Model Accuracy</span>
          </div>
          <span className="text-emerald-400 font-bold">98.7%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-teal-400" />
            <span className="text-white/80 text-sm">Processing Speed</span>
          </div>
          <span className="text-teal-400 font-bold">2.3ms</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-white/80 text-sm">Neural Layers</span>
          </div>
          <span className="text-cyan-400 font-bold">128</span>
        </div>
      </div>
    </div>
  )
}
