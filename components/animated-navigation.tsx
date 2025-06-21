"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, ArrowRight } from "lucide-react"

interface AnimatedNavigationProps {
  currentSection: number
  onSectionChange: (section: number) => void
}

const navigationItems = [
  { name: "WORK", id: "projects", index: 1 },
  { name: "ABOUT", id: "about", index: 2 },
  { name: "BLOG", id: "blog", index: 3 },
  { name: "CONTACT", id: "contact", index: 4 },
]

export default function AnimatedNavigation({ currentSection, onSectionChange }: AnimatedNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial navigation animation
    if (navRef.current && logoRef.current) {
      const tl = gsap.timeline({ delay: 2.5 })

      tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }).fromTo(
        logoRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.5",
      )
    }

    // Scroll detection
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)

      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          opacity: scrolled ? 1 : 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    // Mouse tracking for magnetic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Menu animation
    if (menuRef.current) {
      if (isMenuOpen) {
        // Opening animation
        gsap.set(menuRef.current, { display: "flex" })

        const tl = gsap.timeline()

        tl.fromTo(
          menuRef.current,
          { clipPath: "circle(0% at 95% 5%)" },
          { clipPath: "circle(150% at 95% 5%)", duration: 0.8, ease: "power3.out" },
        )
          .fromTo(
            menuRef.current.querySelectorAll(".menu-item"),
            { x: 100, opacity: 0, rotationY: 45 },
            { x: 0, opacity: 1, rotationY: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.4",
          )
          .fromTo(
            menuRef.current.querySelectorAll(".menu-decoration"),
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" },
            "-=0.3",
          )
      } else {
        // Closing animation
        const tl = gsap.timeline()

        tl.to(menuRef.current.querySelectorAll(".menu-item"), {
          x: -50,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        })
          .to(menuRef.current, { clipPath: "circle(0% at 95% 5%)", duration: 0.6, ease: "power3.in" }, "-=0.1")
          .set(menuRef.current, { display: "none" })
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Active section indicator animation
    if (indicatorRef.current) {
      const activeIndex = Math.max(0, currentSection - 1)
      gsap.to(indicatorRef.current, {
        x: activeIndex * 80,
        duration: 0.5,
        ease: "power3.out",
      })
    }
  }, [currentSection])

  const handleSectionClick = (index: number, sectionId: string) => {
    onSectionChange(index)

    // Page transition effect
    const transitionOverlay = document.createElement("div")
    transitionOverlay.className = "fixed inset-0 z-50 bg-black transform translate-y-full pointer-events-none"
    document.body.appendChild(transitionOverlay)

    gsap
      .timeline()
      .to(transitionOverlay, {
        y: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      })
      .call(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      })
      .to(transitionOverlay, {
        y: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.3,
        onComplete: () => {
          document.body.removeChild(transitionOverlay)
        },
      })

    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    handleSectionClick(0, "hero")
  }

  // Magnetic effect for menu button
  const handleMenuButtonHover = (e: React.MouseEvent) => {
    if (!menuButtonRef.current) return

    const rect = menuButtonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3

    gsap.to(menuButtonRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMenuButtonLeave = () => {
    if (!menuButtonRef.current) return

    gsap.to(menuButtonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 p-6">
        {/* Background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-white/80 backdrop-blur-md opacity-0"
          style={{ borderRadius: "0 0 20px 20px" }}
        />

        <div className="relative flex justify-between items-center max-w-7xl mx-auto">
          {/* Animated Logo */}
          <div ref={logoRef} className="cursor-pointer group" onClick={handleLogoClick}>
            <div className="flex items-center space-x-1">
              {"CREATIVE".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-lg font-bold text-black transition-all duration-300 group-hover:text-gray-600"
                  style={{
                    transform: `translateY(${Math.sin((mousePosition.x + index * 50) * 0.01) * 2}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors duration-300 ml-2">
                STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {/* Active indicator */}
            <div ref={indicatorRef} className="absolute bottom-0 left-0 w-12 h-0.5 bg-black transform translate-y-2" />

            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.index, item.id)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-gray-600 group ${
                  currentSection === item.index ? "text-black" : "text-gray-500"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gray-100 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full -z-10" />
              </button>
            ))}
          </div>

          {/* Animated Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden relative w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group overflow-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseMove={handleMenuButtonHover}
            onMouseLeave={handleMenuButtonLeave}
          >
            <div className="relative z-10">
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
              )}
            </div>
            <div className="absolute inset-0 bg-gray-800 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 md:hidden hidden"
        style={{ clipPath: "circle(0% at 95% 5%)" }}
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8 relative">
          {/* Menu decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="menu-decoration absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full" />
            <div className="menu-decoration absolute top-40 right-16 w-3 h-3 bg-white/10 rounded-full" />
            <div className="menu-decoration absolute bottom-32 left-20 w-1 h-1 bg-white/30 rounded-full" />
            <div className="menu-decoration absolute bottom-20 right-12 w-4 h-4 bg-white/5 rounded-full" />
          </div>

          {/* Menu Items */}
          {navigationItems.map((item, index) => (
            <div key={item.id} className="menu-item group cursor-pointer">
              <button
                onClick={() => handleSectionClick(item.index, item.id)}
                className="flex items-center space-x-4 text-4xl font-bold text-white hover:text-gray-300 transition-all duration-300"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                <ArrowRight className="h-8 w-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </button>
              <div className="w-0 group-hover:w-full h-0.5 bg-white/30 transition-all duration-500 mt-2" />
            </div>
          ))}

          {/* Menu Footer */}
          <div className="menu-item absolute bottom-12 text-center">
            <p className="text-white/60 text-sm">hello@creativestudio.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
