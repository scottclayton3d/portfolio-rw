"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LiquidText from "./liquid-text"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "Frontend Development", level: 95, color: "from-purple-500 to-pink-500" },
  { name: "3D Modeling & WebGL", level: 88, color: "from-blue-500 to-cyan-500" },
  { name: "Music Production", level: 92, color: "from-green-500 to-emerald-500" },
  { name: "Creative Coding", level: 90, color: "from-orange-500 to-red-500" },
  { name: "UI/UX Design", level: 85, color: "from-violet-500 to-purple-500" },
  { name: "Audio Programming", level: 87, color: "from-teal-500 to-blue-500" },
]

const experiences = [
  {
    year: "2024",
    title: "Senior Creative Developer",
    company: "Digital Studio",
    description: "Leading innovative web experiences",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "Tech Startup",
    description: "Building scalable applications",
  },
  { year: "2020", title: "Music Producer", company: "Independent", description: "Creating electronic compositions" },
  { year: "2018", title: "3D Artist", company: "Creative Agency", description: "Developing immersive visuals" },
]

export default function CosmicAbout() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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
        // Title animation
        gsap.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })

        // Content animation
        gsap.fromTo(
          contentRef.current?.children || [],
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: "power2.out" },
        )

        // Skills animation
        gsap.fromTo(
          skillsRef.current?.querySelectorAll(".skill-bar") || [],
          { width: 0 },
          { width: "100%", duration: 1.5, stagger: 0.1, delay: 1, ease: "power2.out" },
        )

        // Timeline animation
        gsap.fromTo(
          timelineRef.current?.querySelectorAll(".timeline-item") || [],
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 1.2, ease: "power2.out" },
        )

        // Stats animation
        gsap.fromTo(
          statsRef.current?.querySelectorAll(".stat-item") || [],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, delay: 1.5, ease: "back.out(1.7)" },
        )
      },
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)",
            filter: "blur(100px)",
            top: "10%",
            right: "5%",
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.03}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.9) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.04}px)`,
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * -0.02}px)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="mb-16 text-center">
          <div className="h-24 mb-6">
            <LiquidText text="ABOUT" fontSize={2} distortion={0.1} className="w-full h-full" />
          </div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">Creative developer focused on digital experiences.</p>
        </div>

        <div ref={contentRef} className="space-y-24">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Bio Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-6">My Journey</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  I'm a creative developer who bridges the gap between design and technology. With over 8 years of
                  experience, I specialize in creating immersive digital experiences that combine cutting-edge web
                  technologies with artistic vision.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  My work spans across multiple disciplines - from building responsive web applications and interactive
                  3D experiences to producing electronic music and designing sound landscapes. I believe in the power of
                  interdisciplinary creativity.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Every project is an opportunity to explore new possibilities, experiment with emerging technologies,
                  and create meaningful connections between users and digital experiences.
                </p>
              </div>

              {/* Skills Section */}
              <div ref={skillsRef} className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Technical Expertise</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(index)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/90 font-medium">{skill.name}</span>
                        <span className="text-white/60 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-300 ${
                            activeSkill === index ? "shadow-lg shadow-purple-500/30" : ""
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-item bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/60 text-sm">Projects Completed</div>
                </div>
                <div className="stat-item bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">8+</div>
                  <div className="text-white/60 text-sm">Years Experience</div>
                </div>
                <div className="stat-item bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">25+</div>
                  <div className="text-white/60 text-sm">Music Tracks</div>
                </div>
                <div className="stat-item bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-white/60 text-sm">3D Models</div>
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">Favorite Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Three.js", "GSAP", "WebGL", "Blender", "Ableton", "TypeScript", "Next.js"].map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div ref={timelineRef} className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Experience Timeline</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"></div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.year}
                    className={`timeline-item flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                        <div className="text-purple-400 font-bold text-lg mb-2">{exp.year}</div>
                        <h4 className="text-white font-bold text-xl mb-2">{exp.title}</h4>
                        <div className="text-white/60 mb-2">{exp.company}</div>
                        <p className="text-white/80 text-sm">{exp.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6">Let's Create Something Amazing</h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative projects that push creative boundaries. Whether it's a
                web application, 3D experience, or audio-visual installation.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available for projects</span>
                </div>
                <div>hello@creativestudio.com</div>
                <div>San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <div
        className="absolute top-20 right-20 w-6 h-6 bg-purple-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 left-20 w-4 h-4 bg-pink-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-40 right-40 w-5 h-5 bg-blue-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-40 w-3 h-3 bg-cyan-500/60 rounded-full animate-bounce"
        style={{ animationDelay: "1.5s" }}
      />
    </section>
  )
}
