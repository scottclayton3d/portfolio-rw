"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentSection: number
  onSectionChange: (section: number) => void
}

const navigationItems = [
  { name: "HOME", id: "hero", index: 0 },
  { name: "WORK", id: "projects", index: 1 },
  { name: "ABOUT", id: "about", index: 2 },
  { name: "CONTACT", id: "contact", index: 3 },
]

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power2.out" },
      )
    }
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.to(menuRef.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.fromTo(
          menuRef.current.querySelectorAll(".menu-item"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: "power2.out" },
        )
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }, [isMenuOpen])

  const handleSectionClick = (index: number, sectionId: string) => {
    onSectionChange(index)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-30 p-6 bg-black/80 backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-lg font-medium text-white tracking-wide">PORTFOLIO</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.index, item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  currentSection === item.index ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black z-40 md:hidden opacity-0 invisible"
        style={{ visibility: "hidden" }}
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {navigationItems.map((item) => (
            <div key={item.id} className="menu-item">
              <button
                onClick={() => handleSectionClick(item.index, item.id)}
                className={`text-2xl font-medium transition-colors duration-300 ${
                  currentSection === item.index ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
