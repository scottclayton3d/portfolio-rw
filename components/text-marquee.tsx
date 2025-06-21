"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TextMarqueeProps {
  text: string
  speed?: number
  className?: string
  reverse?: boolean
}

export default function TextMarquee({ text, speed = 50, className = "", reverse = false }: TextMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeWidth = marqueeRef.current.scrollWidth
    const containerWidth = marqueeRef.current.parentElement?.offsetWidth || 0
    const distance = marqueeWidth - containerWidth

    gsap.to(marqueeRef.current, {
      x: reverse ? distance : -distance,
      duration: speed,
      repeat: -1,
      ease: "none",
    })
  }, [speed, reverse])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
        {text.repeat(10)}
      </div>
    </div>
  )
}
