"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowDown, Star, Diamond, Circle, Triangle } from "lucide-react"
import MicroAnimations from "./micro-animations"

export default function UniqueHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Parallax effect for decorative elements
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPos = (clientX / innerWidth - 0.5) * 20
      const yPos = (clientY / innerHeight - 0.5) * 20

      gsap.to(".parallax-element", {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline({ delay: 2 })

    // Animate title words individually
    tl.fromTo(
      titleRef.current?.querySelectorAll(".title-word") || [],
      {
        y: 200,
        opacity: 0,
        rotation: 10,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      },
    )

    // Animate floating image
    tl.fromTo(
      imageRef.current,
      {
        scale: 0,
        rotation: -45,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    // Continuous floating animation for image
    gsap.to(imageRef.current, {
      y: -20,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="parallax-element absolute top-20 left-20 h-6 w-6 text-purple-400/30" />
        <Diamond className="parallax-element absolute top-40 right-32 h-8 w-8 text-pink-400/20" />
        <Circle className="parallax-element absolute bottom-32 left-16 h-10 w-10 text-blue-400/25" />
        <Triangle className="parallax-element absolute top-60 left-1/3 h-5 w-5 text-yellow-400/30" />
        <Star className="parallax-element absolute bottom-20 right-20 h-7 w-7 text-green-400/20" />
        <Diamond className="parallax-element absolute top-32 right-1/4 h-4 w-4 text-red-400/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Typography */}
          <div className="lg:col-span-8">
            <MicroAnimations animation="fadeInUp" stagger={0.1}>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                  ✨ CREATIVE DEVELOPER
                </span>
              </div>
            </MicroAnimations>

            <div ref={titleRef} className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none">
                <div className="title-word inline-block mr-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NOCH
                </div>
                <div className="title-word inline-block bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                  FRAGEN?
                </div>
              </h1>
            </div>

            <MicroAnimations animation="slideInLeft" delay={1}>
              <div className="max-w-2xl mb-12">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Du möchtest ein Projekt zum einmaligen Preis? Ein anderes Anliegen?{" "}
                  <span className="text-gray-500">Nimm gerne Kontakt auf.</span>
                </p>
              </div>
            </MicroAnimations>

            <MicroAnimations animation="bounceIn" delay={1.5}>
              <div className="flex items-center space-x-6">
                <button
                  onClick={scrollToProjects}
                  className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                </button>

                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-sm font-medium">E-MAIL</span>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                  <a
                    href="mailto:hello@creative-dev.com"
                    className="text-white hover:text-purple-400 transition-colors duration-300 font-medium"
                  >
                    hello@creative-dev.com
                  </a>
                </div>
              </div>
            </MicroAnimations>
          </div>

          {/* Right Side - Floating Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
                <img
                  src="/placeholder.svg?height=320&width=320"
                  alt="Creative Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating decorative elements around image */}
              <Star className="absolute -top-4 -right-4 h-8 w-8 text-yellow-400 animate-spin" />
              <Diamond className="absolute -bottom-4 -left-4 h-6 w-6 text-pink-400 animate-bounce" />
              <Circle className="absolute top-1/2 -left-8 h-4 w-4 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section Info */}
      <div className="absolute bottom-8 left-6 right-6">
        <div className="flex justify-between items-end text-sm text-gray-400">
          <MicroAnimations animation="fadeInUp" delay={2}>
            <div>
              <span className="font-medium">WEBDESIGN & WEBFLOW</span>
            </div>
          </MicroAnimations>

          <MicroAnimations animation="fadeInUp" delay={2.2}>
            <div className="flex items-center space-x-4">
              <Star className="h-3 w-3" />
              <Diamond className="h-3 w-3" />
              <Circle className="h-3 w-3" />
            </div>
          </MicroAnimations>

          <MicroAnimations animation="fadeInUp" delay={2.4}>
            <div>
              <span className="font-medium">©2024-2025</span>
            </div>
          </MicroAnimations>
        </div>
      </div>
    </section>
  )
}
