"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface MicroAnimationsProps {
  children: React.ReactNode
  animation?: "fadeInUp" | "slideInLeft" | "scaleIn" | "rotateIn" | "bounceIn"
  delay?: number
  stagger?: number
}

export default function MicroAnimations({
  children,
  animation = "fadeInUp",
  delay = 0,
  stagger = 0,
}: MicroAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = stagger > 0 ? containerRef.current.children : [containerRef.current]

    const getAnimationProps = () => {
      switch (animation) {
        case "fadeInUp":
          return {
            from: { y: 50, opacity: 0 },
            to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          }
        case "slideInLeft":
          return {
            from: { x: -100, opacity: 0 },
            to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          }
        case "scaleIn":
          return {
            from: { scale: 0, opacity: 0 },
            to: { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          }
        case "rotateIn":
          return {
            from: { rotation: -180, scale: 0, opacity: 0 },
            to: { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          }
        case "bounceIn":
          return {
            from: { y: -100, opacity: 0 },
            to: { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
          }
        default:
          return {
            from: { y: 50, opacity: 0 },
            to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          }
      }
    }

    const { from, to } = getAnimationProps()

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        if (stagger > 0) {
          gsap.fromTo(elements, from, { ...to, stagger, delay })
        } else {
          gsap.fromTo(elements, from, { ...to, delay })
        }
      },
    })
  }, [animation, delay, stagger])

  return <div ref={containerRef}>{children}</div>
}
