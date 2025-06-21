"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SVGTextMaskProps {
  text: string
  images: string[]
  className?: string
  fontSize?: string
  marquee?: boolean
}

export default function SVGTextMask({
  text,
  images,
  className = "",
  fontSize = "8rem",
  marquee = false,
}: SVGTextMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !imageRef.current) return

    // Animate images cycling through the mask
    const imageElements = imageRef.current.children
    if (imageElements.length > 1) {
      const tl = gsap.timeline({ repeat: -1 })

      Array.from(imageElements).forEach((img, index) => {
        tl.to(img, {
          opacity: index === 0 ? 1 : 0,
          duration: 0,
        })
          .to(img, {
            opacity: 1,
            duration: 1,
            delay: index * 3,
          })
          .to(img, {
            opacity: 0,
            duration: 1,
            delay: 2,
          })
      })
    }

    // Marquee effect
    if (marquee) {
      const textElement = svgRef.current.querySelector("text")
      if (textElement) {
        gsap.to(textElement, {
          x: -200,
          duration: 20,
          repeat: -1,
          ease: "none",
        })
      }
    }

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
        )
      },
    })
  }, [marquee])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background Images */}
      <div ref={imageRef} className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* SVG Text Mask */}
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id={`textMask-${text.replace(/\s+/g, "")}`}>
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              letterSpacing="-0.05em"
            >
              {text}
            </text>
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="white" mask={`url(#textMask-${text.replace(/\s+/g, "")})`} />
      </svg>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
    </div>
  )
}
