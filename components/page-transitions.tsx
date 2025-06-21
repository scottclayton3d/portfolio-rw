"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface PageTransitionsProps {
  children: React.ReactNode
  isActive: boolean
}

export default function PageTransitions({ children, isActive }: PageTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !curtainRef.current) return

    if (isActive) {
      // Page entrance animation
      const tl = gsap.timeline()

      // Curtain effect
      tl.fromTo(
        curtainRef.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 1.2, ease: "power3.inOut" },
      )

      // Content reveal
      tl.fromTo(
        containerRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      )

      // Overlay fade
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.8",
      )
    }
  }, [isActive])

  return (
    <div className="relative">
      {/* Transition Overlay */}
      <div ref={overlayRef} className="fixed inset-0 z-50 bg-black pointer-events-none" />

      {/* Curtain Effect */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-40 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none"
      />

      {/* Content */}
      <div ref={containerRef} className={isActive ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </div>
  )
}
