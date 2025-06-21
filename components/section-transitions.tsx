"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionsProps {
  children: React.ReactNode
  className?: string
  animationType?: "fade" | "slide" | "scale" | "reveal"
}

export default function SectionTransitions({
  children,
  className = "",
  animationType = "fade",
}: SectionTransitionsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const getAnimation = () => {
      switch (animationType) {
        case "slide":
          return {
            from: { x: 100, opacity: 0 },
            to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          }
        case "scale":
          return {
            from: { scale: 0.8, opacity: 0 },
            to: { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
          }
        case "reveal":
          return {
            from: { clipPath: "inset(100% 0 0 0)" },
            to: { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out" },
          }
        default:
          return {
            from: { y: 80, opacity: 0 },
            to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          }
      }
    }

    const { from, to } = getAnimation()

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(contentRef.current, from, to)
      },
    })
  }, [animationType])

  return (
    <div ref={sectionRef} className={`section ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
