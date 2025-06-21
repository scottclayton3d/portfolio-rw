"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projectsRow1 = [
  {
    id: 1,
    title: "Cosmic Interface",
    category: "UI/UX Design",
    description: "A futuristic interface design with cosmic elements and smooth animations",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["React", "Three.js", "GSAP"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Liquid Typography",
    category: "Experimental Design",
    description: "Exploring fluid typography with dynamic color gradients and morphing effects",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["CSS", "JavaScript", "WebGL"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Portfolio Grid",
    category: "Web Development",
    description: "A responsive portfolio grid with advanced filtering and smooth transitions",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Creative Studio",
    category: "Brand Identity",
    description: "Complete brand identity and website for a creative design studio",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Figma", "React", "GSAP"],
    link: "#",
    github: "#",
  },
]

const projectsRow2 = [
  {
    id: 5,
    title: "Neural Network",
    category: "Data Visualization",
    description: "Interactive neural network visualization with real-time data processing",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["D3.js", "Python", "WebGL"],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "AR Experience",
    category: "Augmented Reality",
    description: "Immersive AR shopping experience with 3D product visualization",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Unity", "ARKit", "C#"],
    link: "#",
    github: "#",
  },
  {
    id: 7,
    title: "AI Art Generator",
    category: "Machine Learning",
    description: "AI-powered creative art generation with style transfer capabilities",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["TensorFlow", "Python", "React"],
    link: "#",
    github: "#",
  },
  {
    id: 8,
    title: "Music Visualizer",
    category: "Audio Visual",
    description: "Real-time music visualization with dynamic particle systems",
    image: "/placeholder.svg?height=600&width=800",
    tech: ["Web Audio API", "Canvas", "GLSL"],
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="flex-none w-80 md:w-96 mx-4"
    >
      <div className="glass-effect rounded-2xl overflow-hidden group cursor-pointer h-full">
        <div className="relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6">
          <span className="text-pink-400 text-xs font-medium uppercase tracking-wider">{project.category}</span>
          <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-pink-400 transition-colors">{project.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" size="sm" className="flex-1 border-white/10 hover:bg-white/5">
              <ExternalLink className="mr-2 h-3 w-3" />
              Live
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-white/10 hover:bg-white/5">
              <Github className="mr-2 h-3 w-3" />
              Code
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollingRow({
  projects,
  direction = "left",
}: {
  projects: any[]
  direction?: "left" | "right"
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], direction === "left" ? ["0%", "-35%"] : ["-35%", "0%"])

  return (
    <div ref={containerRef} className="relative overflow-hidden py-4">
      <motion.div style={{ x }} className="flex">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="py-20 cosmic-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 liquid-text">Selected Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase creativity, innovation, and technical excellence
          </p>
        </motion.div>
      </div>

      <div className="space-y-8">
        {/* First row - scrolls left */}
        <ScrollingRow projects={projectsRow1} direction="left" />

        {/* Second row - scrolls right */}
        <ScrollingRow projects={projectsRow2} direction="right" />
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-16"
      >
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full glow-effect">
          View All Projects
        </Button>
      </motion.div>
    </section>
  )
}
