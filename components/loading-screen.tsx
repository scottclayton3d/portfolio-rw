"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate loading text
    tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })

    // Animate progress bar
    tl.fromTo(progressRef.current, { width: "0%" }, { width: "100%", duration: 2, ease: "power2.inOut" }, "-=0.5")

    // Fade out loader
    tl.to(
      loaderRef.current,
      {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
      },
      "-=0.5",
    )
  }, [])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <div className="text-2xl font-medium text-white tracking-wide mb-2">PORTFOLIO</div>
          <div className="text-sm text-gray-400">Loading Experience</div>
        </div>

        <div className="w-64 h-px bg-gray-800 relative overflow-hidden">
          <div ref={progressRef} className="h-full bg-white" style={{ width: "0%" }} />
        </div>
      </div>
    </div>
  )
}
