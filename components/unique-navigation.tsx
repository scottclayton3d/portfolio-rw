"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, ArrowRight, Star, Diamond, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UniqueNavigationProps {
  currentSection: number
  onSectionChange: (section: number) => void
}

const navigationItems = [
  { name: "HOME", id: "hero", icon: Star },
  { name: "WORK", id: "projects", icon: Diamond },
  { name: "ABOUT", id: "about", icon: Circle },
  { name: "BLOG", id: "blog", icon: Star },
  { name: "CONTACT", id: "contact", icon: Diamond },
]

export default function UniqueNavigation({ currentSection, onSectionChange }: UniqueNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const decorativeElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate navigation entrance
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.children,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 1, ease: "power3.out" },
      )
    }

    // Animate decorative elements
    if (decorativeElementsRef.current) {
      const elements = decorativeElementsRef.current.children
      Array.from(elements).forEach((element, index) => {
        gsap.fromTo(
          element,
          { scale: 0, rotation: 0 },
          {
            scale: 1,
            rotation: 360,
            duration: 2,
            delay: 1.5 + index * 0.2,
            ease: "back.out(1.7)",
          },
        )

        // Continuous floating animation
        gsap.to(element, {
          y: -10,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2,
        })
      })
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        // Menu opening animation
        gsap.to(menuRef.current, {
          clipPath: "circle(150% at 95% 5%)",
          duration: 0.8,
          ease: "power3.out",
        })

        gsap.fromTo(
          menuRef.current.querySelectorAll(".menu-item"),
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" },
        )
      } else {
        // Menu closing animation
        gsap.to(menuRef.current, {
          clipPath: "circle(0% at 95% 5%)",
          duration: 0.6,
          ease: "power3.in",
        })
      }
    }
  }, [isMenuOpen])

  const handleSectionClick = (index: number, sectionId: string) => {
    onSectionChange(index)

    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }

    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Decorative Elements */}
      <div ref={decorativeElementsRef} className="fixed inset-0 pointer-events-none z-10">
        <Star className="absolute top-20 left-20 h-4 w-4 text-purple-400/60" />
        <Diamond className="absolute top-40 right-32 h-3 w-3 text-pink-400/60" />
        <Circle className="absolute bottom-32 left-16 h-5 w-5 text-blue-400/60" />
        <Star className="absolute top-60 left-1/2 h-3 w-3 text-yellow-400/60" />
        <Diamond className="absolute bottom-20 right-20 h-4 w-4 text-green-400/60" />
        <Circle className="absolute top-32 right-1/4 h-3 w-3 text-red-400/60" />
      </div>

      {/* Main Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-30 p-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CREATIVE
            </div>
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Star className="h-4 w-4 text-yellow-400 animate-spin" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(index, item.id)}
                  className={`group relative flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                    currentSection === index ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <IconComponent className="h-3 w-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{item.name}</span>
                  {currentSection === index && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-purple-400 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <div className="absolute -top-1 -right-1">
                <Diamond className="h-2 w-2 text-pink-400 animate-pulse" />
              </div>
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-black/95 backdrop-blur-lg z-40 lg:hidden"
        style={{ clipPath: "circle(0% at 95% 5%)" }}
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={item.id} className="menu-item">
                <button
                  onClick={() => handleSectionClick(index, item.id)}
                  className={`group flex items-center space-x-4 text-3xl font-bold transition-all duration-300 ${
                    currentSection === index ? "text-purple-400" : "text-white hover:text-purple-300"
                  }`}
                >
                  <IconComponent className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.name}</span>
                  <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Menu Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Star className="absolute top-20 left-10 h-6 w-6 text-yellow-400/30 animate-spin" />
          <Diamond className="absolute bottom-32 right-16 h-8 w-8 text-pink-400/30 animate-bounce" />
          <Circle className="absolute top-1/2 left-8 h-4 w-4 text-blue-400/30 animate-pulse" />
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed pointer-events-none z-50 hidden lg:block"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60" />
      </div>
    </>
  )
}
