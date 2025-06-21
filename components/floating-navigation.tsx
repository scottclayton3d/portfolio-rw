"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Home, Briefcase, User, Mail, ArrowRight } from "lucide-react"

interface FloatingNavigationProps {
  currentSection: number
  onSectionChange: (section: number) => void
}

const navigationItems = [
  { name: "HOME", icon: Home, index: 0 },
  { name: "WORK", icon: Briefcase, index: 1 },
  { name: "ABOUT", icon: User, index: 2 },
  { name: "CONTACT", icon: Mail, index: 3 },
]

export default function FloatingNavigation({ currentSection, onSectionChange }: FloatingNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      // Floating animation
      gsap.to(navRef.current, {
        y: Math.sin(Date.now() * 0.001) * 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Magnetic effect
      const rect = navRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (mousePosition.x - centerX) * 0.1
      const deltaY = (mousePosition.y - centerY) * 0.1

      gsap.to(navRef.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [mousePosition])

  useEffect(() => {
    if (itemsRef.current) {
      if (isExpanded) {
        gsap.to(itemsRef.current, {
          width: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        })

        gsap.fromTo(
          itemsRef.current.children,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2, ease: "power2.out" },
        )
      } else {
        gsap.to(itemsRef.current, {
          width: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }, [isExpanded])

  const handleSectionClick = (index: number) => {
    onSectionChange(index)
    setIsExpanded(false)
  }

  return (
    <div
      ref={navRef}
      className="fixed top-8 right-8 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center bg-black/20 backdrop-blur-md border border-white/20 rounded-full overflow-hidden">
        {/* Expand Button */}
        <button className="w-14 h-14 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300">
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Navigation Items */}
        <div ref={itemsRef} className="flex items-center opacity-0 w-0 overflow-hidden">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.index}
                onClick={() => handleSectionClick(item.index)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  currentSection === item.index
                    ? "text-white bg-white/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
