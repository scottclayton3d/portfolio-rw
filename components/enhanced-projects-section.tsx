"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProjectDetailModal from "./project-detail-modal"

gsap.registerPlugin(ScrollTrigger)

const categories = ["All", "Web Dev", "3D Art", "Blender Addons", "Virtual Instruments", "Music Production"]

const enhancedProjects = [
  {
    id: 1,
    title: "Interactive Web Experience",
    category: "Web Dev",
    description: "Award-winning interactive website with WebGL animations and GSAP transitions",
    longDescription:
      "This project represents the pinnacle of modern web development, combining cutting-edge WebGL technology with sophisticated GSAP animations to create an immersive user experience. The website features dynamic particle systems, smooth page transitions, and responsive design that adapts seamlessly across all devices. Built with performance in mind, it achieves 95+ Lighthouse scores while maintaining visual excellence.",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React", "WebGL", "GSAP", "Three.js"],
    year: "2024",
    client: "Tech Startup",
    duration: "3 months",
    technologies: ["Next.js", "TypeScript", "Three.js", "GSAP", "WebGL", "Tailwind CSS", "Framer Motion"],
    challenges: [
      "Optimizing WebGL performance across different devices",
      "Creating smooth animations without impacting page load times",
      "Ensuring accessibility while maintaining visual complexity",
      "Cross-browser compatibility for advanced features",
    ],
    solutions: [
      "Implemented progressive enhancement with fallbacks",
      "Used Web Workers for heavy computations",
      "Created custom accessibility controls",
      "Extensive testing across browser matrix",
    ],
    results: [
      "95+ Lighthouse performance score",
      "40% increase in user engagement",
      "Featured on Awwwards Site of the Day",
      "Zero accessibility violations",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Architectural Visualization",
    category: "3D Art",
    description: "Photorealistic 3D renders for architectural projects using advanced lighting techniques",
    longDescription:
      "A comprehensive architectural visualization project that brings unbuilt spaces to life through photorealistic 3D rendering. Using advanced lighting techniques, material shaders, and post-processing workflows, this project delivers stunning visuals that help clients visualize their future spaces with unprecedented clarity and detail.",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Blender", "Cycles", "Photorealism"],
    year: "2024",
    client: "Architecture Firm",
    duration: "2 months",
    technologies: ["Blender", "Cycles Renderer", "Substance Painter", "Photoshop", "After Effects"],
    modelUrl: "/assets/3d/duck.glb",
    challenges: [
      "Achieving photorealistic lighting in interior spaces",
      "Managing complex material workflows",
      "Optimizing render times for client iterations",
      "Creating accurate architectural details",
    ],
    solutions: [
      "Developed custom HDRI lighting setups",
      "Created reusable material libraries",
      "Implemented render optimization techniques",
      "Used reference photography for accuracy",
    ],
    results: [
      "Client approval on first presentation",
      "Reduced revision cycles by 60%",
      "Featured in architectural magazine",
      "Led to 3 additional project contracts",
    ],
  },
  {
    id: 3,
    title: "Synthwave VST",
    category: "Virtual Instruments",
    description: "Retro-inspired virtual synthesizer with advanced modulation capabilities",
    longDescription:
      "A professional-grade virtual synthesizer plugin that captures the essence of 80s synthwave music while providing modern production capabilities. Features include multiple oscillator types, advanced filter designs, comprehensive modulation matrix, and a vintage-inspired interface that's both nostalgic and functional.",
    image: "/placeholder.svg?height=400&width=600",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tags: ["C++", "JUCE", "DSP", "Audio"],
    year: "2023",
    duration: "6 months",
    technologies: ["C++", "JUCE Framework", "DSP Programming", "VST3 SDK", "Audio Unit"],
    audioTracks: [
      {
        id: 1,
        title: "Neon Dreams",
        artist: "Synthwave VST Demo",
        duration: "3:24",
        url: "/audio/demo1.mp3",
        waveform: Array.from({ length: 50 }, () => Math.random() * 100),
      },
      {
        id: 2,
        title: "Retro Future",
        artist: "Synthwave VST Demo",
        duration: "2:56",
        url: "/audio/demo2.mp3",
        waveform: Array.from({ length: 50 }, () => Math.random() * 100),
      },
    ],
    challenges: [
      "Implementing real-time audio processing",
      "Creating vintage analog sound character",
      "Optimizing CPU usage for live performance",
      "Cross-platform compatibility",
    ],
    solutions: [
      "Used advanced DSP algorithms for analog modeling",
      "Implemented efficient buffer management",
      "Created custom optimization techniques",
      "Extensive testing on multiple DAWs",
    ],
    results: [
      "Over 10,000 downloads in first month",
      "Featured in Electronic Musician magazine",
      "Used by professional producers",
      "4.8/5 star rating on plugin marketplaces",
    ],
    githubUrl: "https://github.com/example",
  },
]

export default function EnhancedProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(enhancedProjects)
  const [selectedProject, setSelectedProject] = useState<(typeof enhancedProjects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(enhancedProjects)
    } else {
      setFilteredProjects(enhancedProjects.filter((project) => project.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
        },
      })
    }

    if (gridRef.current) {
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            gridRef.current?.children || [],
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          )
        },
      })
    }
  }, [])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    // Animate filter change
    gsap.to(gridRef.current?.children || [], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.fromTo(
          gridRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
        )
      },
    })
  }

  const openProjectDetail = (project: (typeof enhancedProjects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="projects" ref={sectionRef} className="section min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PROJECTS
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my diverse creative work across multiple disciplines
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => openProjectDetail(project)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {project.liveUrl && (
                    <Button size="icon" variant="secondary" className="h-8 w-8" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="icon" variant="secondary" className="h-8 w-8" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-400">{project.year}</span>
                </div>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openProjectDetail(project)}
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedProject(null)
          }}
        />
      )}
    </section>
  )
}
