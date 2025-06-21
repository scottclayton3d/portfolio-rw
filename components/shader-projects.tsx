"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import EnhancedWebGLTextShader from "./enhanced-shader-text"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "WEB",
    fullTitle: "Digital Experiences",
    category: "Web Development",
    year: "2024",
    description: "Interactive web platforms combining modern design with seamless functionality",
    colorScheme: "vibrant" as const,
    edgeDistortion: 0.3,
    flowIntensity: 0.2,
    tags: ["React", "GSAP", "WebGL"],
  },
  {
    id: 2,
    title: "3D",
    fullTitle: "Visual Identity",
    category: "3D Art",
    year: "2024",
    description: "Comprehensive brand identity systems with 3D elements and motion graphics",
    colorScheme: "iridescent" as const,
    edgeDistortion: 0.25,
    flowIntensity: 0.15,
    tags: ["Blender", "Cinema 4D", "After Effects"],
  },
  {
    id: 3,
    title: "AUDIO",
    fullTitle: "Sound Design",
    category: "Music Production",
    year: "2024",
    description: "Immersive soundscapes and audio experiences for digital installations",
    colorScheme: "sunset" as const,
    edgeDistortion: 0.35,
    flowIntensity: 0.25,
    tags: ["Ableton", "Max/MSP", "Sound Design"],
  },
  {
    id: 4,
    title: "CODE",
    fullTitle: "Creative Tools",
    category: "Development",
    year: "2023",
    description: "Professional workflow enhancement tools and creative applications",
    colorScheme: "ocean" as const,
    edgeDistortion: 0.2,
    flowIntensity: 0.1,
    tags: ["Python", "JavaScript", "UI/UX"],
  },
]

export default function ShaderProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      onEnter: () => {
        gsap.fromTo(
          projectsRef.current?.children || [],
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power2.out" },
        )
      },
    })

    // Auto-cycle through projects
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title with Enhanced Shader */}
        <div className="mb-20">
          <div ref={titleRef} className="h-32 mb-8">
            <EnhancedWebGLTextShader
              text="WORK"
              fontSize={3}
              colorScheme={projects[activeProject].colorScheme}
              edgeDistortion={0.3}
              flowIntensity={0.2}
              className="w-full h-full"
            />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Selected projects spanning digital experiences, visual design, and creative technology
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-500 ${
                activeProject === index ? "scale-105" : "scale-100 opacity-70"
              }`}
              onMouseEnter={() => setActiveProject(index)}
            >
              {/* Project Shader Text with Individual Settings */}
              <div className="h-64 mb-6 relative overflow-hidden rounded-lg bg-black">
                <EnhancedWebGLTextShader
                  text={project.title}
                  fontSize={1.5}
                  colorScheme={project.colorScheme}
                  edgeDistortion={project.edgeDistortion}
                  flowIntensity={project.flowIntensity}
                  className="w-full h-full"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="icon" variant="secondary" className="bg-white/90">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white/90">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{project.category}</span>
                  <span className="text-sm text-gray-400">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-black group-hover:text-gray-600 transition-colors duration-300">
                  {project.fullTitle}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Project Details */}
        <div className="mt-20 p-8 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-4">{projects[activeProject].fullTitle}</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{projects[activeProject].description}</p>
              <div className="flex space-x-4">
                <Button className="bg-black text-white hover:bg-gray-800">View Project</Button>
                <Button variant="outline">Case Study</Button>
              </div>
            </div>

            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <EnhancedWebGLTextShader
                text={projects[activeProject].title}
                fontSize={2}
                colorScheme={projects[activeProject].colorScheme}
                edgeDistortion={projects[activeProject].edgeDistortion}
                flowIntensity={projects[activeProject].flowIntensity}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
