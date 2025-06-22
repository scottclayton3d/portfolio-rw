"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import LiquidText from "./liquid-text"

import DemoChatInterface from "./project-components/chat-interface"
import DemoCodeEditor from "./project-components/code-editor"
import DemoKanbanBoard from "./project-components/kanban-board"
import DemoDashboard from "./project-components/dashboard"
import VirtualReality from "./project-components/virtual-reality"
import AIIntegration from "./project-components/ai-integration"
import MotionGraphics from "./project-components/motion-graphics"
import BlockchainApps from "./project-components/blockchain-apps"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "CHAT",
    subtitle: "INTERFACE",
    category: "Web Development",
    year: "2024",
    description:
      "Interactive web platform combining modern design with seamless functionality and cutting-edge animations",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    component: DemoChatInterface,
  },
  {
    id: 2,
    title: "CODE",
    subtitle: "EDITOR",
    category: "3D Art",
    year: "2024",
    description: "Comprehensive brand identity system with 3D elements, motion graphics, and immersive experiences",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    component: DemoCodeEditor,
  },
  {
    id: 3,
    title: "KANBAN",
    subtitle: "BOARD",
    category: "Music Production",
    year: "2024",
    description: "Immersive soundscape design for digital installations, interactive experiences, and spatial audio",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    component: DemoKanbanBoard,
  },
  {
    id: 4,
    title: "CREATIVE",
    subtitle: "DASHBOARD",
    category: "Development",
    year: "2023",
    description: "Professional workflow enhancement tools, creative applications, and innovative digital solutions",
    gradient: "from-green-500 via-blue-500 to-purple-500",
    component: DemoDashboard,
  },
  {
    id: 5,
    title: "VIRTUAL",
    subtitle: "REALITY",
    category: "VR/AR",
    year: "2024",
    description: "Immersive virtual reality experiences with spatial computing and interactive 3D environments",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    component: VirtualReality,
  },
  {
    id: 6,
    title: "AI",
    subtitle: "INTEGRATION",
    category: "Machine Learning",
    year: "2024",
    description: "Intelligent systems and AI-powered applications for enhanced user experiences and automation",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    component: AIIntegration,
  },
  {
    id: 7,
    title: "MOTION",
    subtitle: "GRAPHICS",
    category: "Animation",
    year: "2023",
    description: "Dynamic motion graphics and cinematic animations for digital media and brand storytelling",
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    component: MotionGraphics,
  },
  {
    id: 8,
    title: "BLOCKCHAIN",
    subtitle: "APPS",
    category: "Web3",
    year: "2023",
    description: "Decentralized applications and blockchain integrations for the future of digital ownership",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    component: BlockchainApps,
  },
]

export default function HorizontalProjects() {
  const [currentProject, setCurrentProject] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })

          gsap.fromTo(
            containerRef.current?.children || [],
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" },
          )
        },
      })
    }
  }, [])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProjectData = projects[currentProject]

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)`,
            filter: "blur(60px)",
            top: "10%",
            left: "20%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, transparent 70%)`,
            filter: "blur(50px)",
            bottom: "20%",
            right: "15%",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.025}px)`,
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Section Title */}
        <div ref={titleRef} className="pt-20 pb-10 px-8">
          <div className="h-32">
            <LiquidText text="WORK" fontSize={3} distortion={0.15} className="w-full h-full" />
          </div>
          <p className="text-white/60 text-lg max-w-2xl mt-4">
            Selected projects spanning digital experiences, visual design, and creative technology
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="flex-1 relative">
          <div
            ref={containerRef}
            className="flex items-center h-full px-8 space-x-24 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex-shrink-0 w-[90vw] max-w-7xl snap-center transition-all duration-700 ${
                  index === currentProject ? "scale-100 opacity-100" : "scale-95 opacity-60"
                }`}
                onClick={() => setCurrentProject(index)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full min-h-[600px]">
                  {/* Project Visual */}
                  <div className={`order-2 lg:order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative group">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                        {/* React Component Display */}
                        <project.component />

                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-overlay opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                        />

                        {/* Liquid Text Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="h-24 w-full opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                            <LiquidText text={project.title} fontSize={1.5} distortion={0.2} />
                          </div>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute top-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="icon" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                        <Button size="icon" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
                          <Github className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`order-1 lg:order-2 ${index % 2 === 1 ? "lg:order-1" : ""} space-y-8`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/60 tracking-wide">{project.category}</span>
                      <span className="text-sm text-white/40">{project.year}</span>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                        {project.title}
                      </h3>
                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/60 leading-tight">
                        {project.subtitle}
                      </h4>
                    </div>

                    <p className="text-lg text-white/70 leading-relaxed max-w-lg">{project.description}</p>

                    <div className="flex items-center space-x-4">
                      <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                        View Project
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                        Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <Button
              size="icon"
              onClick={prevProject}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>

            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProject ? "bg-white w-8" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <Button
              size="icon"
              onClick={nextProject}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-full"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
