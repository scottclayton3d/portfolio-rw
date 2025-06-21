"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LiquidText from "./liquid-text"

gsap.registerPlugin(ScrollTrigger)

export default function CosmicContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })

        gsap.fromTo(
          contentRef.current?.children || [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.5, ease: "power2.out" },
        )
      },
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Success animation
    gsap.to(e.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, transparent 70%)",
            filter: "blur(100px)",
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.03}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: "20%",
            right: "15%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div ref={titleRef} className="mb-16">
          <div className="h-32 mb-8">
            <LiquidText text="CONTACT" fontSize={3} distortion={0.18} className="w-full h-full" />
          </div>
          <p className="text-lg text-white/60 max-w-2xl">
            Ready to collaborate on your next project? Let's create something exceptional together.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-0 border-b border-white/20 rounded-none bg-transparent px-0 py-4 text-lg text-white placeholder-white/40 focus:border-white/60 focus:ring-0 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-0 border-b border-white/20 rounded-none bg-transparent px-0 py-4 text-lg text-white placeholder-white/40 focus:border-white/60 focus:ring-0 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="border-0 border-b border-white/20 rounded-none bg-transparent px-0 py-4 text-lg text-white placeholder-white/40 focus:border-white/60 focus:ring-0 resize-none transition-colors duration-300"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-full font-medium transition-all duration-300 group"
              >
                <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                SEND MESSAGE
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Email</h3>
                  <p className="text-white/60">hello@creativestudio.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
                  <p className="text-white/60">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Location</h3>
                  <p className="text-white/60">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">Available for Projects</span>
              </div>
              <p className="text-white/60 text-sm">
                Currently accepting new projects and collaborations. Let's discuss your vision and bring it to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
