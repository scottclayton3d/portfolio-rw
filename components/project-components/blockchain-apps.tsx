"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Link, Shield, Coins, TrendingUp } from "lucide-react"

export default function BlockchainApps() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chainRef = useRef<HTMLDivElement>(null)
  const cryptoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate blockchain
    if (chainRef.current) {
      const blocks = chainRef.current.children
      Array.from(blocks).forEach((block, index) => {
        gsap.to(block, {
          rotationY: 360,
          duration: 4 + index * 0.5,
          repeat: -1,
          ease: "none",
        })
      })
    }

    // Animate crypto values
    if (cryptoRef.current) {
      gsap.to(cryptoRef.current, {
        textContent: "47,832",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        snap: { textContent: 1 },
      })
    }

    // Container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-500/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">Web3 DApps</h3>
          <p className="text-white/60 text-sm">Blockchain Integration</p>
        </div>
        <Link className="h-5 w-5 text-amber-400" />
      </div>

      {/* Blockchain Visualization */}
      <div ref={chainRef} className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-6 h-6 bg-amber-500 rounded border-2 border-amber-400" />
        <div className="w-4 h-0.5 bg-amber-400" />
        <div className="w-6 h-6 bg-orange-500 rounded border-2 border-orange-400" />
        <div className="w-4 h-0.5 bg-orange-400" />
        <div className="w-6 h-6 bg-red-500 rounded border-2 border-red-400" />
      </div>

      {/* Crypto Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="text-white/80 text-sm">Token Value</span>
          </div>
          <span ref={cryptoRef} className="text-amber-400 font-bold">
            42,156
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-orange-400" />
            <span className="text-white/80 text-sm">Security</span>
          </div>
          <span className="text-green-400 font-bold">Verified</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-white/80 text-sm">Growth</span>
          </div>
          <span className="text-green-400 font-bold">+24.7%</span>
        </div>
      </div>
    </div>
  )
}
