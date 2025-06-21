"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { X, ExternalLink, Github, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ThreeDModelViewer from "./three-d-model-viewer"
import AudioPlayer from "./audio-player"

interface ProjectDetailProps {
  project: {
    id: number
    title: string
    category: string
    description: string
    longDescription: string
    image: string
    images: string[]
    tags: string[]
    year: string
    client?: string
    duration?: string
    technologies: string[]
    challenges: string[]
    solutions: string[]
    results: string[]
    liveUrl?: string
    githubUrl?: string
    modelUrl?: string
    audioTracks?: any[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Animate modal entrance
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 },
      )

      // Prevent body scroll
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
      })

      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: onClose,
      })
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="bg-gray-900 rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
              {project.client && (
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{project.client}</span>
                </div>
              )}
              {project.duration && <span>Duration: {project.duration}</span>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {project.liveUrl && (
              <Button size="icon" variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="icon" variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button size="icon" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={project.images?.[currentImageIndex] || project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {project.images && project.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex ? "border-purple-500" : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Model Viewer */}
          {project.modelUrl && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">3D Model</h3>
              <ThreeDModelViewer
                modelUrl={project.modelUrl}
                title={project.title}
                description="Interactive 3D model - Click and drag to rotate, scroll to zoom"
              />
            </div>
          )}

          {/* Audio Player */}
          {project.audioTracks && project.audioTracks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Audio Samples</h3>
              <AudioPlayer tracks={project.audioTracks} />
            </div>
          )}

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Challenges</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-300 flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Solutions</h3>
              <ul className="space-y-2">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="text-gray-300 flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Results & Impact</h3>
            <ul className="space-y-2">
              {project.results.map((result, index) => (
                <li key={index} className="text-gray-300 flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
