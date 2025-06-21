"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    document.addEventListener("mousemove", moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, .cursor-hover")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  )
}
