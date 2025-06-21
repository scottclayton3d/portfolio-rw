"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MinimalNavigationProps {
  currentSection: number
  onSectionChange: (section: number) => void
}

const navigationItems = [
  { name: "WORK", id: "projects" },
  { name: "ABOUT", id: "about" },
  { name: "BLOG", id: "blog" },
  { name: "CONTACT", id: "contact" },
]

export default function MinimalNavigation({ currentSection, onSectionChange }: MinimalNavigationProps) {
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
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-30 p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-lg font-medium text-black tracking-wide">CREATIVE STUDIO</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(index + 1, item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  currentSection === index + 1 ? "text-black" : "text-gray-500 hover:text-black"
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
            className="md:hidden text-black hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-white z-40 md:hidden opacity-0 invisible"
        style={{ visibility: "hidden" }}
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {navigationItems.map((item, index) => (
            <div key={item.id} className="menu-item">
              <button
                onClick={() => handleSectionClick(index + 1, item.id)}
                className={`text-2xl font-medium transition-colors duration-300 ${
                  currentSection === index + 1 ? "text-black" : "text-gray-500 hover:text-black"
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
