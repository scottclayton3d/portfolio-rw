"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function MinimalAbout() {
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
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" },
        )
      },
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section min-h-screen py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} className="space-y-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold text-black mb-8">ABOUT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a creative developer who bridges the gap between design and technology. With expertise spanning web
                development, 3D art, music production, and interactive experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My work focuses on creating meaningful digital experiences that push creative boundaries while
                maintaining technical excellence.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">EXPERTISE</h3>
                <div className="space-y-2 text-gray-600">
                  <div>Frontend Development</div>
                  <div>3D Modeling & Animation</div>
                  <div>Audio Programming</div>
                  <div>Music Production</div>
                  <div>Creative Coding</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-4">CONTACT</h3>
                <div className="space-y-2 text-gray-600">
                  <div>hello@creativestudio.com</div>
                  <div>Available for projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
