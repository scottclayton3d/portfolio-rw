"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Eye, Star, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import MicroAnimations from "./micro-animations"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "EINFACHER ABLAUF",
    subtitle: "Simple Process",
    category: "Web Development",
    price: "PRO MONAT € 3.245,-",
    description:
      "Websites können ganz schön komplex sein - aber der Prozess dahin und die Website selbst sollten es nicht sein.",
    additionalText: "Niemand möchte sich durch endlose Seiten klicken.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    tags: ["Next.js", "GSAP", "WebGL"],
    steps: [
      { number: "01", title: "DEFINE", description: "Project scope and requirements" },
      { number: "02", title: "DESIGN", description: "Visual concept and prototyping" },
      { number: "03", title: "BUILD", description: "Development and implementation" },
      { number: "04", title: "RUN", description: "Launch and optimization" },
    ],
  },
  {
    id: 2,
    title: "CREATIVE VISION",
    subtitle: "3D Art & Animation",
    category: "3D Art",
    price: "STARTING € 2.500,-",
    description: "Bringing imagination to life through cutting-edge 3D visualization and animation techniques.",
    additionalText: "Every pixel tells a story.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    tags: ["Blender", "Cinema 4D", "After Effects"],
    steps: [
      { number: "01", title: "CONCEPT", description: "Ideation and mood boarding" },
      { number: "02", title: "MODEL", description: "3D modeling and texturing" },
      { number: "03", title: "ANIMATE", description: "Motion and dynamics" },
      { number: "04", title: "RENDER", description: "Final output and delivery" },
    ],
  },
  {
    id: 3,
    title: "SOUND DESIGN",
    subtitle: "Audio Experience",
    category: "Music Production",
    price: "FROM € 1.800,-",
    description: "Crafting immersive audio landscapes that enhance digital experiences and storytelling.",
    additionalText: "Sound is the invisible thread that connects emotion to experience.",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    tags: ["Ableton", "Max/MSP", "VST Development"],
    steps: [
      { number: "01", title: "LISTEN", description: "Understanding the sonic vision" },
      { number: "02", title: "COMPOSE", description: "Creating musical elements" },
      { number: "03", title: "PRODUCE", description: "Recording and mixing" },
      { number: "04", title: "MASTER", description: "Final polish and delivery" },
    ],
  },
]

export default function UniqueProjectsLayout() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!projectsRef.current) return

    // Staggered entrance animation for projects
    ScrollTrigger.create({
      trigger: projectsRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          projectsRef.current?.children || [],
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          },
        )
      },
    })
  }, [])

  const handleProjectHover = (index: number) => {
    setActiveProject(index)

    // Animate project cards
    gsap.to(`.project-card-${index}`, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })

    // Animate other cards
    projects.forEach((_, i) => {
      if (i !== index) {
        gsap.to(`.project-card-${i}`, {
          scale: 0.98,
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  }

  const handleProjectLeave = () => {
    // Reset all cards
    projects.forEach((_, i) => {
      gsap.to(`.project-card-${i}`, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  }

  return (
    <section id="projects" ref={sectionRef} className="section min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-32 left-16 h-4 w-4 text-purple-400/20 animate-pulse" />
        <Diamond className="absolute top-20 right-20 h-6 w-6 text-pink-400/30 animate-spin" />
        <Star className="absolute bottom-40 left-1/4 h-3 w-3 text-yellow-400/25 animate-bounce" />
        <Diamond className="absolute bottom-20 right-1/3 h-5 w-5 text-blue-400/20 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <MicroAnimations animation="fadeInUp">
          <div className="mb-20">
            <div className="flex items-center space-x-4 mb-6">
              <Star className="h-6 w-6 text-purple-400" />
              <span className="text-purple-400 font-medium tracking-wider">SELECTED WORK</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </h2>
          </div>
        </MicroAnimations>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card-${index} grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={handleProjectLeave}
            >
              {/* Project Image */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:col-start-7" : ""}`}>
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Decorative Elements */}
                  <Star className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400/60 animate-spin" />
                  <Diamond className="absolute -bottom-4 -right-4 h-6 w-6 text-pink-400/60 animate-bounce" />
                </div>
              </div>

              {/* Project Content */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <div className="space-y-8">
                  {/* Price Tag */}
                  <MicroAnimations animation="scaleIn" delay={0.2}>
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-bold border border-purple-500/30">
                        {project.price}
                      </span>
                    </div>
                  </MicroAnimations>

                  {/* Title */}
                  <MicroAnimations animation="fadeInUp" delay={0.3}>
                    <div>
                      <h3 className="text-5xl md:text-6xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {project.title}
                        </span>
                      </h3>
                      <p className="text-xl text-gray-400 font-medium">{project.subtitle}</p>
                    </div>
                  </MicroAnimations>

                  {/* Description */}
                  <MicroAnimations animation="slideInLeft" delay={0.4}>
                    <div className="space-y-4">
                      <p className="text-lg text-gray-300 leading-relaxed max-w-lg">{project.description}</p>
                      <p className="text-gray-500 italic">{project.additionalText}</p>
                    </div>
                  </MicroAnimations>

                  {/* Process Steps */}
                  <MicroAnimations animation="fadeInUp" delay={0.5} stagger={0.1}>
                    <div className="grid grid-cols-2 gap-4">
                      {project.steps.map((step) => (
                        <div key={step.number} className="group">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl font-bold text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                              {step.number}
                            </span>
                            <div>
                              <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                                {step.title}
                              </h4>
                              <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </MicroAnimations>

                  {/* Tags */}
                  <MicroAnimations animation="bounceIn" delay={0.6}>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-purple-500/50 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </MicroAnimations>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <MicroAnimations animation="fadeInUp" delay={0.8}>
          <div className="text-center mt-32">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300">
              VIEW ALL PROJECTS
            </Button>
          </div>
        </MicroAnimations>
      </div>
    </section>
  )
}
