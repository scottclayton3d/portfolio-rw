"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Terminal, Cpu, Zap } from "lucide-react"

export default function CreativeTools() {
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate code lines
    if (codeRef.current) {
      const lines = codeRef.current.children
      Array.from(lines).forEach((line, index) => {
        gsap.fromTo(
          line,
          { width: "0%" },
          {
            width: "100%",
            duration: 1 + Math.random() * 0.5,
            delay: index * 0.2,
            ease: "power2.out",
          },
        )
      })
    }

    // Terminal cursor blink
    if (terminalRef.current) {
      gsap.to(terminalRef.current.querySelector(".cursor"), {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }

    // Container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Dev Tools</h3>
          <p className="text-white/60 text-sm">Creative Development</p>
        </div>
        <Code className="h-5 w-5 text-green-400" />
      </div>

      {/* Code Editor Simulation */}
      <div className="bg-black/40 rounded p-3 mb-4 font-mono text-sm">
        <div ref={codeRef} className="space-y-1">
          <div className="text-blue-400 overflow-hidden whitespace-nowrap">{"const createMagic = () => {"}</div>
          <div className="text-green-400 overflow-hidden whitespace-nowrap pl-4">return new Experience();</div>
          <div className="text-purple-400 overflow-hidden whitespace-nowrap">{"};"}</div>
        </div>
      </div>

      {/* Terminal */}
      <div ref={terminalRef} className="bg-black/60 rounded p-3 mb-4 font-mono text-sm">
        <div className="text-green-400">
          $ npm run create-magic<span className="cursor">|</span>
        </div>
        <div className="text-white/60">✨ Building amazing experiences...</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-green-400" />
          <span className="text-white/80 text-sm">React</span>
        </div>
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-blue-400" />
          <span className="text-white/80 text-sm">Node.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-purple-400" />
          <span className="text-white/80 text-sm">GSAP</span>
        </div>
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-orange-400" />
          <span className="text-white/80 text-sm">WebGL</span>
        </div>
      </div>
    </div>
  )
}
