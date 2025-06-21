"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

gsap.registerPlugin(ScrollTrigger)

export default function MinimalContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          contentRef.current?.children || [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
        )
      },
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" ref={sectionRef} className="section min-h-screen py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} className="space-y-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold text-black mb-8">GET IN TOUCH</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Ready to collaborate on your next project? Let's create something exceptional together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 text-lg focus:border-black focus:ring-0"
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
                  className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 text-lg focus:border-black focus:ring-0"
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
                  className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-4 text-lg focus:border-black focus:ring-0 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-none font-medium"
              >
                <Send className="h-4 w-4 mr-2" />
                SEND MESSAGE
              </Button>
            </form>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">DIRECT CONTACT</h3>
                <div className="space-y-2 text-gray-600">
                  <div>hello@creativestudio.com</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4">LOCATION</h3>
                <div className="text-gray-600">San Francisco, CA</div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4">AVAILABILITY</h3>
                <div className="text-gray-600">Currently accepting new projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
