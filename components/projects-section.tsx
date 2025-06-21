"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "DIGITAL EXPERIENCE",
    category: "Web Development",
    year: "2024",
    description: "Interactive web platform combining modern design with seamless functionality",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "VISUAL IDENTITY",
    category: "3D Art",
    year: "2024",
    description: "Comprehensive brand identity system with 3D elements and motion graphics",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "AUDIO LANDSCAPE",
    category: "Music Production",
    year: "2024",
    description: "Immersive soundscape design for digital installations and experiences",
    gradient: "from-orange-500 to-red-500",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

        gsap.fromTo(
          projectsRef.current?.children || [],
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.3, ease: "power3.out" },
        )
      },
    })
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">WORK</h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Selected projects spanning digital experiences, visual design, and creative technology
          </p>
        </div>

        <div ref={projectsRef} className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Project Visual */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative group">
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <div className="w-full h-full bg-black/20 flex items-center justify-center">
                      <div className="text-white/80 text-2xl font-bold">{project.title}</div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute top-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 tracking-wide">{project.category}</span>
                    <span className="text-sm text-gray-400">{project.year}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">{project.title}</h3>

                  <p className="text-lg text-gray-300 leading-relaxed max-w-lg">{project.description}</p>

                  <Button className="bg-white text-black hover:bg-gray-200 transition-colors duration-300">
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
