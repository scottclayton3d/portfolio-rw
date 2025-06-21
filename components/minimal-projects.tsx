"use client"

import { useEffect, useRef, useState } from "react"
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
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "GSAP", "WebGL"],
  },
  {
    id: 2,
    title: "VISUAL IDENTITY",
    category: "3D Art",
    year: "2024",
    description: "Comprehensive brand identity system with 3D elements and motion graphics",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Blender", "Cinema 4D", "After Effects"],
  },
  {
    id: 3,
    title: "AUDIO LANDSCAPE",
    category: "Music Production",
    year: "2024",
    description: "Immersive soundscape design for digital installations and experiences",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Ableton", "Max/MSP", "Sound Design"],
  },
  {
    id: 4,
    title: "CREATIVE TOOLS",
    category: "Blender Addons",
    year: "2023",
    description: "Professional workflow enhancement tools for 3D artists and designers",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Blender API", "UI/UX"],
  },
]

export default function MinimalProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
      },
    })

    ScrollTrigger.create({
      trigger: projectsRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          projectsRef.current?.children || [],
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" },
        )
      },
    })
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section min-h-screen py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-black mb-6">WORK</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Selected projects spanning digital experiences, visual design, and creative technology
          </p>
        </div>

        <div ref={projectsRef} className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative group">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        filter: hoveredProject === project.id ? "none" : "grayscale(100%)",
                        transition: "filter 0.5s ease",
                      }}
                    />
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

                  <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">{project.title}</h3>

                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
