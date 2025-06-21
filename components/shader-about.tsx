"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import WebGLTextShader from "./webgl-text-shader"
import TextMarquee from "./text-marquee"

gsap.registerPlugin(ScrollTrigger)

export default function ShaderAbout() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          contentRef.current?.children || [],
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" },
        )
      },
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={contentRef} className="space-y-20">
          {/* About Title with Shader */}
          <div className="h-40">
            <WebGLTextShader text="ABOUT" fontSize={3.5} colorScheme="iridescent" className="w-full h-full" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a creative developer who bridges the gap between design and technology. With expertise spanning
                  web development, 3D art, music production, and interactive experiences.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My work focuses on creating meaningful digital experiences that push creative boundaries while
                  maintaining technical excellence and artistic integrity.
                </p>
              </div>

              {/* Skills Marquee */}
              <div className="space-y-4">
                <TextMarquee
                  text="FRONTEND DEVELOPMENT • 3D MODELING • AUDIO PROGRAMMING • CREATIVE CODING • "
                  speed={40}
                  className="text-white/60 text-sm font-medium py-2"
                />
                <TextMarquee
                  text="REACT • BLENDER • ABLETON • PYTHON • JAVASCRIPT • GSAP • THREE.JS • "
                  speed={35}
                  className="text-white/40 text-xs py-2"
                  reverse={true}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">EXPERTISE</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-2">
                    <div>Frontend Development</div>
                    <div>3D Modeling & Animation</div>
                    <div>Audio Programming</div>
                  </div>
                  <div className="space-y-2">
                    <div>Music Production</div>
                    <div>Creative Coding</div>
                    <div>Interactive Design</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">CONTACT</h3>
                <div className="space-y-2 text-gray-300">
                  <div>hello@creativestudio.com</div>
                  <div>Available for projects</div>
                  <div>San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="border-t border-gray-800 pt-8">
            <TextMarquee
              text="AVAILABLE FOR FREELANCE • OPEN TO COLLABORATIONS • CREATIVE PARTNERSHIPS • "
              speed={60}
              className="text-white/30 text-lg font-bold"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
