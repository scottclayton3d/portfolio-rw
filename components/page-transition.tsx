"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface PageTransitionProps {
  children: React.ReactNode
  isActive: boolean
  direction?: "up" | "down"
}

export default function PageTransition({ children, isActive, direction = "up" }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return

    if (isActive) {
      // Entry animation
      const tl = gsap.timeline()

      // Overlay animation
      tl.fromTo(
        overlayRef.current,
        {
          scaleY: 0,
          transformOrigin: direction === "up" ? "bottom" : "top",
        },
        {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.inOut",
        },
      ).to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: direction === "up" ? "top" : "bottom",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.1,
      })

      // Content animation
      tl.fromTo(
        containerRef.current.children,
        {
          y: direction === "up" ? 100 : -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      )
    }
  }, [isActive, direction])

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"
        style={{ scaleY: 0 }}
      />
      <div ref={containerRef} className={isActive ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </div>
  )
}
